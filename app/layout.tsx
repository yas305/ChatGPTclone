import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import Sidebar from "@/components/Sidebar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { SessionProvider } from "@/components/SessionProvider";
import Login from "@/components/Login";
import ClientProvider from "@/components/ClientProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chat GPT clone",
  description: "my version of chatgpt",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  const session = await getServerSession(authOptions)

  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          {!session ? (
            <Login />
          ) : (

            <div className="flex">
              <div className="bg-slate-900 max-w-xs h-screen overflow-y-auto md:min-w-[15rem]">
                <Sidebar />
              </div>
              
              <ClientProvider/>
                <div className="bg-slate-600 flex-1"> {children} </div>
          </div>
        
      )}
      </SessionProvider>
    </body>
  </html >
  );
}
