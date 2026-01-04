import { Link } from "react-router-dom"
import { formatMarketCap } from "../Utils/currencyFormatters"

function CryptoCards({crypto}) {
  return (
    <Link to={`crypto-coin/${crypto.id}`}>
      <div className='flex flex-col justify-center items-start gap-3 cursor-pointer rounded-[10px] border-gray-700 border-r border-b p-2 hover:border-t hover:border-l hover:translate-y-[-10px] transition-all duration-200'>
          {/* CRYPTO HEADER */}
          <div className='flex items-center justify-center gap-2'>
          <img src={crypto.image} alt="A crypto image" className='w-10 h-10'/>
          <div className="flex flex-col justify-center items-start gap-1">
              <p>{crypto.name}</p>
              <p>({crypto.symbol.toUpperCase()})</p>
              <p className='bg-blue-600 px-3 py-1 rounded-full text-[10px]'>#{crypto.market_cap_rank}</p>
          </div>
          </div>

          {/* CRYPTO AMOUNT */}
          <p className='font-bold text-2xl'>${crypto.current_price<0.01?crypto.current_price.toLocaleString("en-US",{minimumFractionDigits: 2, maximumFractionDigits: 2}):crypto.current_price.toLocaleString("en-US",{minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>

          {/* CRYPTO CHANGE */}
          <p className={crypto.price_change_percentage_24h > 0 ? "text-green-300 bg-green-700 px-2 py-1 rounded-full" : "text-red-300 bg-red-700 px-2 py-1 rounded-full"}>{crypto.price_change_percentage_24h > 0 ? "+" : ""}{crypto.price_change_percentage_24h && crypto.price_change_percentage_24h.toFixed(2)}%</p>
          
          <hr className='text-gray-500 w-full'/>

          {/* CRYPTO MARKET CAP & VOLUME */}
          <div className='flex justify-between items-center gap-1 w-full'>
          <div className='flex flex-col justify-center items-start'>
              <p className='text-gray-400 text-sm'>Market Cap</p>
              <p className='font-bold'>${formatMarketCap(crypto.market_cap)}</p>
          </div>
          <div className='flex flex-col justify-center items-start'>
              <p className='text-gray-400 text-sm'>Volume</p>
              <p className='font-bold'>${formatMarketCap(crypto.total_volume)}</p>
          </div>
          </div>
      </div>
    </Link>
  )
}

export default CryptoCards