const getKeyByGenerate = () => {
  let text = ''
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < 5; i++) text += possible.charAt(Math.floor(Math.random() * possible.length))
  return text
}

const getExpiredDate = (sec) => {
  const date = new Date();
  date.setTime(date.getTime() + sec * 1000);
  return date
}

const setCookie = (name, value, options = {}) => {
  options = {
    path: '/',
    ...options
  };
  let exp = options.expires;
  if (typeof exp == 'number' && exp) {
    exp = options.expires = getExpiredDate(exp);
  }
  let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }
  document.cookie = updatedCookie;
}

const getCookie = (name) => {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

const deleteCookie = (name) => {
  setCookie(name, null, { expires: -1 });
}

export { getKeyByGenerate, setCookie, getCookie, deleteCookie, getExpiredDate }
