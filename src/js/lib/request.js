import axios from 'axios'

export async function getUrl (url, state) {
  const headers = {}

  if (state.token !== null) { headers.authorization = `Bearer ${state.token}` }
  const result = await axios({
    url: url,
    headers
  })
  return result
}

export async function postUrl (url, body, state) {
  const headers = {}

  if (state.token !== null) { headers.authorization = `Bearer ${state.token}` }
  const result = await axios({
    url: url,
    method: 'post',
    data: body,
    headers
  })
  return result
}

export async function deleteUrl (url, state) {
  const headers = {}

  if (state.token !== null) { headers.authorization = `Bearer ${state.token}` }
  const result = await axios({
    url: url,
    method: 'delete',
    headers
  })
  return result
}
