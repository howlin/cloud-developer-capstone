import * as uuid from 'uuid'
import { RatingItem } from '../models/RatingItem'
import { RatingAccess } from '../dataLayer/ratingAccess'
import { RatingRequest } from '../requests/RatingRequest'
import { parseUserId } from '../auth/utils'

const ratingAccess = new RatingAccess()

export async function getAllRatings(jwtToken: string): Promise<RatingItem[]> {
  const userId = parseUserId(jwtToken)
  return ratingAccess.getAllRatings(userId)
}

export async function createRating(
  createRatingRequest: RatingRequest,
  jwtToken: string
): Promise<RatingItem> {

  const ratingId = uuid.v4()
  const userId = parseUserId(jwtToken)

  return await ratingAccess.createRating({
    userId,
    ratingId,
    createdAt: new Date().toISOString(),
    shop: createRatingRequest.shop,
    rating: createRatingRequest.rating,
    review: createRatingRequest.review
  })
  
}

export async function updateRating(
  updateRatingRequest: RatingRequest,
  jwtToken: string,
  ratingId: string
) {
  const userId = parseUserId(jwtToken)
  return await ratingAccess.updateRating( updateRatingRequest, userId, ratingId)
}

export async function generateUploadUrl(ratingId: string, jwtToken: string) : Promise<string> {
  const userId = parseUserId(jwtToken)
  const imageId = uuid.v4()

  await ratingAccess.addImageToRating(imageId, ratingId, userId)

  return await ratingAccess.generateUploadUrl(imageId)
}

export async function deleteRating(ratingId: string, jwtToken: string): Promise<void> {
  const userId = parseUserId(jwtToken)
  return await ratingAccess.deleteRating(ratingId, userId)
}