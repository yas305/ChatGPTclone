import { SunIcon } from "@heroicons/react/24/outline";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-white ">
      <h1 className="text-5xl font-bold mb-20">chat GPT clone</h1>


      <div className="flex space-x-2 text-center">
        <div>
          <div className="flex flex-col items-center justify-center mb-5">
            <SunIcon className="h-8 w-8" />
            <h2>examples</h2>
          </div>

          <div className="space-y-2">
            <p className="textinfo">"lorem ipsum"</p>
            <p className="textinfo">"Lorem ipsum dolor sit amet consectetur adipisicing"</p>
            <p className="textinfo">"maiores, odio aliquam incidunt harum iste tempore"</p>
          </div>
        </div>
        <div>
          <div className="flex flex-col items-center justify-center mb-5">
            <SunIcon className="h-8 w-8" />
            <h2>examples</h2>


          </div>

          <div className="space-y-2">
            <p className="textinfo">"lorem ipsum"</p>
            <p className="textinfo">"Lorem ipsum dolor sit amet consectetur adipisicing"</p>
            <p className="textinfo">"maiores, odio aliquam incidunt harum iste tempore"</p>
          </div>
        </div>
      </div>
    </div>

  );
}
