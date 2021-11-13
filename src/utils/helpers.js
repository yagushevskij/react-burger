const getKeyByGenerate = () => {
  let text = ''
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < 5; i++) text += possible.charAt(Math.floor(Math.random() * possible.length))
  return text
}

const setCookie = (name, value, options = {}) => {
  options = {
    path: '/',
    ...options
  };
  let exp = options.expires;
  if (typeof exp == 'number' && exp) {
    const date = new Date();
    date.setTime(date.getTime() + exp * 1000);
    exp = options.expires = date;
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

export { getKeyByGenerate, setCookie }
