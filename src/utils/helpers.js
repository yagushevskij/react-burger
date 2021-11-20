import moment from 'moment'
import 'moment/locale/ru'

const getKeyByGenerate = () => {
  let text = ''
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < 5; i++) text += possible.charAt(Math.floor(Math.random() * possible.length))
  return text
}

const getExpiredDate = sec => {
  const date = new Date()
  date.setTime(date.getTime() + sec * 1000)
  return date
}

const setCookie = (name, value, options = {}) => {
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

const getCookie = name => {
  const matches = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)'))
  return matches ? decodeURIComponent(matches[1]) : undefined
}

const deleteCookie = name => {
  setCookie(name, null, { expires: -1 })
}

const getFormatedDay = date => {
  const today = new Date()
  const differenceDay = new Date(date)
  const difference = moment(today).diff(differenceDay, 'days')
  return difference > 1 ? moment(date).from() : moment(date).calendar()
}
moment.updateLocale('ru', {
  calendar: {
    sameDay: '[Сегодня] LT [i-GMT]Z',
    lastDay: '[Вчера] LT [i-GMT]Z',
    sameElse: 'LL LT [i-GMT]Z'
  },
  relativeTime: {
    future: 'in %s',
    past: '%s ago',
    s: 'a few seconds',
    ss: '%d seconds',
    m: 'a minute',
    mm: '%d minutes',
    h: 'an hour',
    hh: '%d hours',
    d: 'a day ff',
    dd: '%d days',
    w: 'a week',
    ww: '%d weeks',
    M: 'a month',
    MM: '%d months',
    y: 'a year',
    yy: '%d years'
  }
})

export { getKeyByGenerate, setCookie, getCookie, deleteCookie, getExpiredDate, getFormatedDay }
