import { MdOutlineCurrencyExchange } from "react-icons/md";


function Navbar() {
  return (
    <div className='navbar fixed top-0 w-full bg-transparent backdrop-blur-lg py-2'>
        {/* POSITION CONTAINER */}
        <div className="flex flex-col justify-between items-center gap-2 max-w-190 mx-auto sm:flex-row">
            {/* LOGO */}
            <div className="flex flex-col items-center gap-2 sm:items-start">
                <div className="flex gap-2 items-center">
                    <MdOutlineCurrencyExchange className="text-2xl"/>
                    <p className="text-2xl font-bold">Crypto Scope</p>
                </div>

                <div className="text-[15px] text-center sm:text-left">
                    Cryptocurrency price feed and market insights
                </div>
            </div>
        
            {/* SEARCH BOX */}
            <input type="text" placeholder="Search cryptocurrencies..." className="bg-gray-900 p-2 rounded-2xl"/>
        </div>
    </div>
  )
}

export default Navbar