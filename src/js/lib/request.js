import axios from 'axios'

export async function getUrl (url) {
  const result = await axios({
    url: url,
    withCredentials: true
  })
  return result
}

export async function postUrl (url, body) {
  const result = await axios({
    url: url,
    method: 'post',
    data: body,
    withCredentials: true
  })
  return result
}

export async function putUrl (url, body) {
  const result = await axios({
    url: url,
    method: 'put',
    data: body,
    withCredentials: true
  })
  return result
}

export async function deleteUrl (url) {
  const result = await axios({
    url: url,
    method: 'delete',
    withCredentials: true
  })
  return result
}
