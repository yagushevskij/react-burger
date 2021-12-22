import moment from 'moment'
import 'moment/locale/ru'

type TCookieOptions = {
  expires?: number,
  path?: string,
  [key: string]: any
} | null

const checkReponse = <T>(res: Response): Promise<T> => {
  return res.ok ? res.json() : res.json().then(err => Promise.reject(err))
}

const getKeyByGenerate = () => {
  let text = ''
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < 5; i++) text += possible.charAt(Math.floor(Math.random() * possible.length))
  return text
}

const getExpiredDate = (sec: number) => {
  const date = new Date()
  date.setTime(date.getTime() + sec * 1000)
  return +date.toUTCString()
}

const setCookie = (name: string, value: string, options: TCookieOptions) => {
  options = {
    path: '/',
    ...options
  }
  let exp = options.expires
  if (typeof exp == 'number' && exp) {
    exp = options.expires = getExpiredDate(exp)
  }
  let updatedCookie = encodeURIComponent(name) + '=' + encodeURIComponent(value)
  for (let optionKey in options) {
    updatedCookie += '; ' + optionKey
    let optionValue = options[optionKey]
    if (optionValue !== true) {
      updatedCookie += '=' + optionValue
    }
  }
  document.cookie = updatedCookie
}

const getCookie = (name: string) => {
  const matches = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)'))
  return matches ? decodeURIComponent(matches[1]) : undefined
}

const deleteCookie = (name: string) => {
  setCookie(name, '', { expires: -1 })
}

const getUniqueAndCountedObjects = (arr: {}[]) => {
  let result: any = []
  const baseQty = { qty: 1 }
  for (let obj of arr) {
    Object.assign(obj, baseQty)
    if (!result.includes(obj)) {
      result.push(obj)
    } else {
      result.qty += 1
    }
  }

  return result
}

const getFormatedDay = (date: Date) => {
  const today = new Date()
  const differenceDay = new Date(date)
  const difference = moment(today).diff(differenceDay, 'days')
  return difference > 1 ? moment(date).from(today) : moment(date).calendar()
}
moment.updateLocale('ru', {
  calendar: {
    sameDay: '[Сегодня] LT [i-GMT]Z',
    lastDay: '[Вчера] LT [i-GMT]Z',
    sameElse: 'LL LT [i-GMT]Z'
  }
})

const numberWithSpaces = (num: any) => {
  if (typeof num === 'number') {
    return num.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')
  }
  return null
}

const getGrouppedItems = (arr: any[], size: number) => {
  let result = []
  for (let i = 0; i < Math.ceil(arr.length / size); i++) {
    result[i] = arr.slice(i * size, i * size + size)
  }
  return result
}

export { getKeyByGenerate, setCookie, getCookie, deleteCookie, getExpiredDate, checkReponse, getFormatedDay, getUniqueAndCountedObjects, numberWithSpaces, getGrouppedItems }
