import { apiEndpoint } from '../config'
import Axios from 'axios'

export async function getRatings(idToken) {

  if(idToken === undefined) return

  const response = await Axios.get(`${apiEndpoint}/ratings`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken.__raw}`
    },
  })
  console.log('Todos:', response.data)
  return response.data.items
}

export async function deleteRating(idToken, ratingId) {
  await Axios.delete(`${apiEndpoint}/ratings/${ratingId}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken.__raw}`
    }
  })
}

export async function createRating(idToken, newRating, file) {
  const response = await addRatingToDB(idToken, newRating)
  let ratingItem = response.data.item

  if( file ) {
    const ratingId = ratingItem.ratingId
    const uploadUrl = await getImageUploadURL(idToken, ratingId)
    ratingItem.attachementUrl = uploadUrl

    await uploadFile(uploadUrl, file)
  }

  return ratingItem
}

export async function updateRating(idToken, ratingId, updatedRating, file) {
  const response = await updateRatinginDB(idToken, ratingId, updatedRating)
  let ratingItem = response.data.item

  if( file ) {
    const uploadUrl = await getImageUploadURL(idToken, ratingId)
    ratingItem.attachementUrl = uploadUrl
    await uploadFile(uploadUrl, file)
  }

  return ratingItem
}

async function addRatingToDB(idToken, newRating) {
  const response = await Axios.post(`${apiEndpoint}/ratings`, JSON.stringify(newRating), {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken.__raw}`
    }
  })
  return response
}

async function updateRatinginDB(idToken, ratingId, updatedRating) {
  const response = await Axios.patch(`${apiEndpoint}/ratings/${ratingId}`, JSON.stringify(updatedRating), {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken.__raw}`
    }
  })
  return response
}

async function getImageUploadURL(idToken, ratingId) {
  const response = await Axios.post(`${apiEndpoint}/ratings/${ratingId}/attachment`, '', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken.__raw}`
    }
  })
  return response.data.uploadUrl
}

async function uploadFile(uploadUrl, file) {
  const result = await Axios.put(uploadUrl, file)
  return result
}