import { NextApiHandler } from "next"
import {MongoClient} from "mongodb"

const handler: NextApiHandler = async (req, res) => {
  if(req.method !== "POST") return

  const { email, name, message } = req.body
  const notValidate = !email || !email.includes("@") || !name || name.trim() === "" || !message || message.trim() === ""

  if(notValidate) {
    res.status(422).json({ message: "Invalid input." })
    return
  }
  
  const newMessage = {
    email, name, message
  }
  
  let client: MongoClient;

  const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.gfrrsyz.mongodb.net/${process.env.mongodb_database}`

  try{
    client = await MongoClient.connect(connectionString)
  }catch(err){
    res.status(500).json({message: "Database connection failed!"})
    return
  }

  const db = client.db()

  try{
    await db.collection("contact").insertOne(newMessage)
  }catch(err){
    res.status(500).json({message: "Storing message failed!"})
    return
  }
  
  client.close()

  res.status(201).json({message: "Successfully stored!"})


}

export default handler