/**
 * Fields in a request to create a single Ratings item.
 */
export interface CreateRatingRequest {
  shop: string,
  rating: number,
  review: string,
}
