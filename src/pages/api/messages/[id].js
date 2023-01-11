import MessagesService from "../../../services/Messages";

export default async function MessagesHandler(req, res) {
  console.log(await MessagesService.getMessagesFromRoom(req.query.id))
  res.status(200).send(await MessagesService.getMessagesFromRoom(req.query.id))
}