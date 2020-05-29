import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import { RatingRequest } from '../../requests/RatingRequest'
import { createLogger } from '../../utils/logger'
import { updateRating } from '../../businessLogic/ratings'

const logger = createLogger('updateRating')

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  logger.info('Processing event: ', event)

  const ratingId = event.pathParameters.ratingId
  const updatedRating: RatingRequest = JSON.parse(event.body)
  const authorization = event.headers.Authorization
  const split = authorization.split(' ')
  const jwtToken = split[1]

  const updatedItem = await updateRating( updatedRating, jwtToken, ratingId)

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
      item: updatedItem
    })
  }
}