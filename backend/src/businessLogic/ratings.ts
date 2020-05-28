import * as uuid from 'uuid'
import { RatingItem } from '../models/RatingItem'
import { RatingAccess } from '../dataLayer/ratingAccess'
import { CreateRatingRequest } from '../requests/CreateRatingRequest'
import { parseUserId } from '../auth/utils'

const ratingAccess = new RatingAccess()

export async function createRating(
  createTodoRequest: CreateRatingRequest,
  jwtToken: string
): Promise<RatingItem> {

  const ratingId = uuid.v4()
  const userId = parseUserId(jwtToken)

  return await ratingAccess.createRating({
    userId,
    ratingId,
    createdAt: new Date().toISOString(),
    shop: createTodoRequest.shop,
    rating: createTodoRequest.rating,
    review: createTodoRequest.review
  })
  
}

export async function generateUploadUrl(todoId: string, jwtToken: string) : Promise<string> {
  const userId = parseUserId(jwtToken)
  const imageId = uuid.v4()

  await ratingAccess.addImageToRating(imageId, todoId, userId)

  return await ratingAccess.generateUploadUrl(imageId)
}