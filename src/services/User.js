let connectedUsers = []
export class UserService {


  static adduserToRoom(user) {
    connectedUsers.push(user)
    return user
  }

  static getUser(socketID) {
    return connectedUsers.filter(u => u.id === socketID)
  }

  static removeUserFromRoom(user) {
    connectedUsers = connectedUsers.map((u) => u.id !== user.id)
    return user
  }




}