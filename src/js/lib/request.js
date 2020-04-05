import axios from 'axios'

export async function refreshToken (state) {
  const headers = {}

  const result = await axios({
    url: `${process.env.BACKEND_URL}/v1/token`,
    method: 'post',
    data: { refreshToken: state.refreshToken },
    headers
  })
  return result
}

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
