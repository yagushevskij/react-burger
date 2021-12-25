import { checkReponse } from './helpers'
import { setCookie, getCookie } from './helpers'
import { API_URL } from './config'

interface IUpdTokenResp {
  success: boolean
  accessToken: string
  refreshToken: string
}

interface TFetchOptopns {
  method: 'POST' | 'GET' | 'PATCH' | 'DELETE'
  headers: {
    'Content-Type': 'application/json'
    authorization?: string
  }
  body?: BodyInit
}

export const retriableFetch = async <T>(url: string, options: TFetchOptopns): Promise<T> => {
  const accessToken = getCookie('accessToken')
  try {
    const res = await fetch(url, options)
    return await checkReponse(res)
  } catch (err) {
    if (!accessToken || (err as Error).message === 'jwt expired') {
      const refreshData = await refreshToken()
      const updatedAccessToken = refreshData.accessToken.split('Bearer ')[1]
      setCookie('refreshToken', refreshData.refreshToken, null)
      setCookie('accessToken', updatedAccessToken, null)
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
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  return await checkReponse<IUpdTokenResp>(res)
}
