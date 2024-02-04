import query from "../../lib/queryapi"
import type { NextApiRequest, NextApiResponse } from 'next'
import admin from "firebase-admin"
import { adminDB } from "@/firebaseAdmin"

type Data = {
    answer: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {

    const { prompt, ChatId, model, session } = req.body

    if (!prompt) {
        res.status(400).json({ answer: "errrrrrr" })
        return
    }

    if (!ChatId) {
        res.status(400).json({ answer: "errrrrrr" })
        return
    }

    const response = await query(prompt, model)

    const message: Message = {
        text: response || "chatgpt was unable to provide ans",
        createdAt: admin.firestore.Timestamp.now(),
        user: {
            _id: "chatGPT",
            name: "name",
            avatar: "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/chatgpt-icon.png"
        }

    }

    await adminDB
        .collection('users')
        .doc(session?.user?.email)
        .collection("chats")
        .doc(ChatId)
        .collection("messages")
        .add(message);

    res.status(200).json({ answer: message.text })
}