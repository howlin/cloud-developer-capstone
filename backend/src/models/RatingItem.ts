export interface RatingItem {
  userId: string
  ratingId: string
  createdAt: string
  shop: string,
  rating: number,
  review: string,
  attachmentUrl?: string
}