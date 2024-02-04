import { DocumentData } from "firebase/firestore"

type Props = {
    message: DocumentData

}

function Message({ message }: Props) {

const isChat= message.user.name=== "chatGPT"

    return (
        <div className={`py-5 text-white  `}>
            <div className={`flex space-x-5 px-10 max-w-2xl mx-auto ${isChat && "bg-[#434654]"}`}>
                <img src={message.user.avatar} alt="avt" className="h-8 w-8" />

                <p className="pt-1 text-sm">{message.text}</p>

            </div>
        </div>
    )
}

export default Message