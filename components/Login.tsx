'use client'
import {signIn} from "next-auth/react"
import Image from "next/image"


function Login() {
  return (
    <div className="bg-teal-400 h-screen flex flex-col items-center justify-center text-center">
<Image
              src="https://static.vecteezy.com/system/resources/previews/021/608/790/original/chatgpt-logo-chat-gpt-icon-on-black-background-free-vector.jpg"
              width={300}
              height={300} alt="logo"
/>

<button onClick={()=>signIn('google')} className=" text-white font-bold text-3xl ani">sign in</button>

    </div>
  )
}

export default Login