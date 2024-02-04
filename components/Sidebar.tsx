'use client'
import { collection } from "firebase/firestore";
import NewChat from "./NewChat"
import { useSession } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore"
import { db } from "@/firebase";
import ChatRow from "./ChatRow";

function Sidebar() {

    const { data: session } = useSession();

    const [chats, loading, error] = useCollection(
        session && 
        collection(db, 'users', 
        session.user?.email!, 'chats')

    );
    console.log(chats);
    return (
        <div className="p-2 flex flex-col h-screen">
            <div className="flex-1">
                <div>
                    <NewChat />


                    <div>
                        {chats?.docs.map(chat => (
                            <ChatRow key={chat.id} id={chat.id} />
                        ))}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Sidebar