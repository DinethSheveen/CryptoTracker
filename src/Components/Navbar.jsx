import { MdOutlineCurrencyExchange } from "react-icons/md";
import Input from "./Input";
import { Link, useLocation } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";

function Navbar({searchCrypto, setSearchCrypto}) {

    const location = useLocation();
    const isHomePage = location.pathname === "/";

  return (
    <div className='navbar fixed top-0 w-full bg-transparent backdrop-blur-lg p-2'>
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
            {isHomePage?
            <Input searchCrypto={searchCrypto} setSearchCrypto={setSearchCrypto}/>
            :
            <Link to="/" className="bg-gray-900 p-2 rounded-2xl px-4 shadow-lg shadow-gray-800 flex items-center gap-2">
                <IoIosArrowRoundBack className="text-2xl"/>
                Back to list
            </Link>
            }
        </div>
    </div>
  )
}

export default Navbar