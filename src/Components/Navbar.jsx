import { MdOutlineCurrencyExchange } from "react-icons/md";


function Navbar({searchCrypto, setSearchCrypto}) {

  return (
    <div className='navbar fixed top-0 w-full bg-transparent backdrop-blur-lg py-2'>
        {/* POSITION CONTAINER */}
        <div className="flex flex-col justify-between items-center gap-2 max-w-190 mx-auto sm:flex-row sm:gap-18">
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
            <input type="text" placeholder="Search cryptocurrencies..." value={searchCrypto} className="flex-1 bg-gray-900 p-2 rounded-2xl placeholder:px-2 shadow-lg shadow-gray-800" onChange={(e)=>{setSearchCrypto(e.target.value)}}/>
        </div>
    </div>
  )
}

export default Navbar