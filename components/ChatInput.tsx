'use client'

import { db } from "@/firebase";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";

type Props = {
    ChatId: string;
};


function ChatInput({ ChatId }: Props) {

    const [prompt, setPropmt] = useState("");
    const { data: session } = useSession();

    const model = "gpt-3.5-turbo"

    const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!prompt) return;
        const input = prompt.trim();
        setPropmt("")

        const message: Message = {
            text: input,
            createdAt: serverTimestamp(),
            user: {
                _id: session?.user?.email!,
                name: session?.user?.name!,
                avatar: session?.user?.image! || `https://ui-avatars.com/api/?name-${session?.user?.name}`,
            }
        }

         await addDoc(collection(db, 'users', session?.user?.email!, 'chats', ChatId, 'messages'),
             message
           )

        const notif= toast.loading("chatGPT is thinking...");

           await fetch('/api/askQuestion',{
               method:'POST',
               headers:{
                   'content-Type': 'application/json'
               },
               body: JSON.stringify({
                prompt: input,
                ChatId, // This should match the case used in your API route
                model: 'gpt-3.5-turbo',
                session
              }),
            })
            .then(response => response.json())
            .then(data => {
              // Here you can handle the response from OpenAI
              console.log(data.response); // Log the response or display it in the UI
              toast.success('chatGPT has responded', { id: notif });
            })
            .catch(error => {
              toast.error('Failed to get response from chatGPT', { id: notif });
            });

        }

    return (
        <div className="bg-gray-700 text-gray-400 rounded-lg text-sm">
            <form onSubmit={sendMessage} className="p-5 space-x-5 flex-1" >
                <input
                    className="
                    m-0 w-full resize-none border-0 bg-transparent py-[10px] pr-10 focus:ring-0 focus-visible:ring-0 dark:bg-transparent md:py-3.5 md:pr-12 placeholder-black/50 dark:placeholder-white/50  "

                    value={prompt}
                    onChange={(e) => setPropmt(e.target.value)}
                    type="textarea"
                    placeholder="enter your message here" />

                <button type="submit" className="bg-teal-400
                 absolute md:bottom-3 md:right-3 dark:hover:bg-white right-2 disabled:opacity-10 disabled:text-gray-400 enabled:bg-black text-white p-0.5 border border-black rounded-lg dark:border-white dark:bg-white bottom-1.5 transition-colors" >

                    <PaperAirplaneIcon className="w-4 h-4 -rotate-45" />
                </button>
            </form>

        </div>
    )
}

export default ChatInput