import { db } from "@/firebase";
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/24/solid";
import { collection, deleteDoc, doc, orderBy, query } from "firebase/firestore";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";

type Props = {
    id: string;
}

function ChatRow({ id }: Props) {
    const pathname = usePathname();
    const router= useRouter();
    const {data: session}=useSession();
    const [active,setActive]=useState(false);

const[messages]= useCollection(query(
    collection(db, 'users', session?.user?.email!, 'chats', id, 'messages'),
    orderBy('createdAt', 'asc')
));

useEffect( ()=>{
    if(!pathname) return;
setActive(pathname.includes(id));
},[pathname, id]);


const removeChat=  async()=>{
    await deleteDoc(doc(db, 'users', session?.user?.email!, 'chats', id))
    router.replace("/")
}

    return (
        <Link href={`/chat/${id}`} className={`chatRow justify-cente ${active && 'bg-gray-500'}`}>
            <ChatBubbleLeftRightIcon className="h-5 w-5" />
            <p className="flex-1 hidden md:inline-flex truncare">{messages?.docs[messages?.docs.length-1]?.data().text || "New Chat"}</p>
            <TrashIcon onClick={removeChat}
            className="h-5 w-5 text-gray-500 hover:text-red-600" />
        </Link>
    )
}

export default ChatRow


