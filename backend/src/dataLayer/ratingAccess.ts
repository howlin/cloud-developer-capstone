import * as AWS  from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { createLogger } from '../utils/logger'
import { RatingItem } from '../models/RatingItem'
import { RatingRequest } from '../requests/RatingRequest'

const logger = createLogger('Data layer')
const XAWS = AWSXRay.captureAWS(AWS)

export class RatingAccess {
  constructor(
    private readonly docClient: DocumentClient = new XAWS.DynamoDB.DocumentClient(),
    private readonly s3 = new XAWS.S3({signatureVersion: 'v4'}),
    private readonly ratingsTable = process.env.RATINGS_TABLE,
    private readonly ratingsIndex = process.env.RATINGS_INDEX,
    private readonly urlExpiration = process.env.SIGNED_URL_EXPIRATION,
    private readonly bucketName = process.env.IMAGES_S3_BUCKET
  ){}

  async getAllRatings(userId: string): Promise<RatingItem[]> {
    logger.info('Getting all ratings')

    const query = {
      TableName: this.ratingsTable,
      ScanIndexForward: false,
      IndexName: this.ratingsIndex,
      KeyConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: {
        ':userId': userId
      },
      ProjectionExpression: 'ratingId, createdAt, shop, review, rating, imageUrl'
    }

    const result = await this.docClient.query(query).promise()
    const items = result.Items

    return items as RatingItem[]
  }

  async createRating(rating: RatingItem): Promise<RatingItem> {
    const params = {
      TableName: this.ratingsTable,
      Item: rating
    }
    logger.info('Create a damn rating', params)
    await this.docClient.put(params).promise()

    return rating
  }

  async updateRating(rating: RatingRequest, userId: string, ratingId: string) {
    const params = {
      TableName: this.ratingsTable,
      Key: {
        userId: userId,
        ratingId: ratingId
      },
      UpdateExpression: "set shop = :shop, rating = :rating, review = :review",
      ExpressionAttributeValues: {
        ':shop': rating.shop,
        ':rating': rating.rating,
        ':review': rating.review,
      }
    }

    logger.info('updating a rating', params)
    await this.docClient.update(params).promise()
    return rating
  }

  async addImageToRating(imageId: string, ratingId: string, userId: string) {
    logger.info('Create a damn rating')
    const params = {
      TableName: this.ratingsTable,
      Key: {
        userId: userId,
        ratingId: ratingId
      },
      UpdateExpression: "set imageUrl = :imageUrl",
      ExpressionAttributeValues: {
        ':imageUrl': `https://${this.bucketName}.s3-eu-west-1.amazonaws.com/${imageId}`
      }
    }

    logger.info('Params', params)

    return await this.docClient.update(params).promise()
  }

  async generateUploadUrl(imageId: string) {
    logger.info('generateUploadUrl')
    return this.s3.getSignedUrl('putObject', {
      Bucket: this.bucketName,
      Key: imageId,
      Expires: Number(this.urlExpiration)
    })
  }

  async deleteRating(ratingId: string, userId: string){
    logger.info('delete rating')
    const params = {
      TableName: this.ratingsTable,
      Key: {
        userId: userId,
        ratingId: ratingId
      }
    }

    await this.docClient.delete(params).promise()
  }
}