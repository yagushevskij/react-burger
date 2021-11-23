import { checkReponse } from "./helpers"
import { setCookie, getCookie } from "./helpers"
import { API_URL } from "./config"


export const retriableFetch = async (url, options = {}) => {
  const accessToken = getCookie('accessToken')
  try {
    const res = await fetch(url, options)
    const result = await checkReponse(res)
    return result
  } catch (err) {
    if (!accessToken || err.message === 'jwt expired') {
      const refreshData = await refreshToken()
      const updatedAccessToken = refreshData.accessToken.split('Bearer ')[1]
      setCookie('refreshToken', refreshData.refreshToken)
      setCookie('accessToken', updatedAccessToken, { expires: 1200 })
      options.headers.authorization = 'Bearer ' + updatedAccessToken
      const res = await fetch(url, options)
      return await checkReponse(res)
    } else {
      throw err
    }
  }
}

const refreshToken = async () => {
  const refreshToken = getCookie('refreshToken')
  const data = { token: refreshToken }
  const res = await fetch(API_URL + 'auth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  return await checkReponse(res)
}