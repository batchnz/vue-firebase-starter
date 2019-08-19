// import jwtDecode from 'jwt-decode'
// import consola from 'consola'

// export function getUserFromCookie(req) {
//   if (!req || !req.cookies) return false
//   const { session: accessTokenCookie } = req.cookies
//   if (!accessTokenCookie) return false
//   const decodedToken = jwtDecode(accessTokenCookie)
//   if (!decodedToken) return false
//   return decodedToken
// }

// export function getUserFromSession(req) {
//   consola.info('[CHECK-AUTH] - checking if user is stored in session')
//   return req.session ? req.session.userId : null
// }
import dayjs from "dayjs";

export function firstLetterUppercase(string) {
  return string.replace(/^\w/, function(chr) {
    return chr.toUpperCase();
  });
}

export function getDate(date) {
  return dayjs(date).format("YYYY MM-DD HH:mm");
}
