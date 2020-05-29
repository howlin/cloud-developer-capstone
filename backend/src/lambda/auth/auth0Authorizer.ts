import { CustomAuthorizerEvent, CustomAuthorizerResult } from 'aws-lambda'
import Axios from 'axios'
import { verify } from 'jsonwebtoken'
import 'source-map-support/register'

import { createLogger } from '../../utils/logger'
import { JwtPayload } from '../../auth/JwtPayload'

const logger = createLogger('auth')

const jwksUrl = process.env.AUTH_0_JWKS_URL


export const handler = async (event: CustomAuthorizerEvent): Promise<CustomAuthorizerResult> => {
  logger.info('Authorizing a user', event.authorizationToken)

  try {
    const jwtToken = await verifyToken(event.authorizationToken)

    return {
      principalId: jwtToken.sub,
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Allow',
            Resource: '*'
          }
        ]
      }
    }
  } catch ( e ) {
    return {
      principalId: 'user',
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Deny',
            Resource: '*'
          }
        ]
      }
    }
  }
}


async function verifyToken(authHeader: string): Promise<JwtPayload> {
  const token = getToken(authHeader)
  const cert = await getCertFromJwks()

  return verify(token, cert, { algorithms: ['RS256'] }) as JwtPayload
}

function getToken(authHeader: string): string {
  if (!authHeader) throw new Error('No authentication header')

  if (!authHeader.toLowerCase().startsWith('bearer '))
    throw new Error('Invalid authentication header')

  const split = authHeader.split(' ')
  const token = split[1]

  return token
}

async function getCertFromJwks(){
  const response = await Axios.get(jwksUrl)
  const keys = response.data.keys
  
  const signingKeys = keys
        .filter(key => key.use === 'sig' // JWK property `use` determines the JWK is for signing
                    && key.kty === 'RSA' // We are only supporting RSA
                    && key.kid           // The `kid` must be present to be useful for later
                    && key.x5c && key.x5c.length // Has useful public keys (we aren't using n or e)
       ).map(key => {
         return { kid: key.kid, nbf: key.nbf, publicKey: certToPEM(key.x5c[0]) };
       });
  
  return signingKeys[0].publicKey
}

export function certToPEM(cert) {
  cert = cert.match(/.{1,64}/g).join('\n');
  cert = `-----BEGIN CERTIFICATE-----\n${cert}\n-----END CERTIFICATE-----\n`;

  return cert;
}