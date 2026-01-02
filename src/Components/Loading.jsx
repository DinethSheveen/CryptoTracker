import { AiOutlineLoading3Quarters } from "react-icons/ai";

function Loading() {
  return (
    <div className="flex justify-center items-center pt-20">
        <div className="flex gap-2 items-center text-2xl animate-pulse">
            <AiOutlineLoading3Quarters className="animate-spin text-2xl"/>
            <p>Loading Crypto Data...</p>
        </div>
    </div>
  )
}

export default Loading