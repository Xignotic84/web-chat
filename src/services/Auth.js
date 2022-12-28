
import * as jose from 'jose'
import Cookies from 'cookies'

const secret = new TextEncoder().encode(
  'tada',
)

export class AuthService {
  static generateJSWToken(data)  {
    return new jose.SignJWT(data)
      .setExpirationTime("1day")
      .setProtectedHeader({alg: "HS256"})
      .sign(secret)

  }
}