import Cookies from 'js-cookie'

const token_key = process.env.LOGIN_TOKEN
const token_expires = process.env.TOKEN_EXPIRE

export function getTokenFromCookie(){
  return Cookies.get(token_key);
}

export function setTokenToCookie(token, rememberMe){
  if(rememberMe){
    Cookies.set(token_key, token, {expires: token_expires});
  } else return Cookies.set(token_key, token);
}

export function removeToken() {
  Cookies.remove(token_key);
}
