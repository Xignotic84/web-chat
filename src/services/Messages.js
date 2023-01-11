import Redis from './../services/Redis'

export default class MessagesService {

  static async getMessagesFromRoom(roomID) {
    const data = await Redis.hgetall(roomID)

    return Object.values(data).map(m => {
      return JSON.parse(m)
    })
  }

  static addMessageToRoom(roomID, message) {
    const data = JSON.stringify(message)
    Redis.hset(roomID, message.id, data)
  }

  static async deleteAll(roomID) {
    const keys = await Redis.hgetall(roomID)
    Object.keys(keys).forEach(key => {
      Redis.hdel(roomID, key)
    })
  }





}
