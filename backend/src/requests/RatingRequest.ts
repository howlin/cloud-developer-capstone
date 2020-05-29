/**
 * Fields in a request to create or update a single Ratings item.
 */
export interface RatingRequest {
  shop: string,
  rating: number,
  review: string,
}
