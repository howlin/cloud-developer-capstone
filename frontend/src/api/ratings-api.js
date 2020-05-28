import { apiEndpoint } from '../config'
import Axios from 'axios'

export async function getRatings(idToken) {
  const response = await Axios.get(`${apiEndpoint}/ratings`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken.__raw}`
    },
  })
  console.log('Todos:', response.data)
  return response.data.items
}

export async function createRating(idToken, newRating) {
  const response = await addRatingToDB(idToken, newRating)
  let ratingItem = response.data.item

  if( newRating.file ) {
    const ratingId = ratingItem.ratingId
    const uploadUrl = await getImageUploadURL(idToken, ratingId)
    ratingItem.attachementUrl = uploadUrl

    await uploadFile(uploadUrl, newRating.file)
  }

  return ratingItem
}

async function addRatingToDB(idToken, newRating) {
  console.log('1. addRatingToDB - starting', {idToken, newRating})
  const response = await Axios.post(`${apiEndpoint}/ratings`, JSON.stringify(newRating), {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken.__raw}`
    }
  })
  console.log('2. addRatingToDB - finished', response)
  return response
}

async function getImageUploadURL(idToken, ratingId) {
  console.log('1. getImageUploadURL - starting', {idToken, ratingId})
  const response = await Axios.post(`${apiEndpoint}/ratings/${ratingId}/attachment`, '', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken.__raw}`
    }
  })
  console.log('2. getImageUploadURL - finished', {response})
  return response.data.uploadUrl
}

async function uploadFile(uploadUrl, file) {
  console.log('1. getImageUploadURL - starting', {uploadUrl, file})
  const result = await Axios.put(uploadUrl, file)
  console.log('2. getImageUploadURL - finishing', {result})
}