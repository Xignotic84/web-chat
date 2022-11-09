import jwt from 'jsonwebtoken'
import Cookies from 'cookies'

export class AuthService {
  static generateJSWToken(data)  {
    return jwt.sign(data, "tada", {
      expiresIn: '1days'
    })
  }
}