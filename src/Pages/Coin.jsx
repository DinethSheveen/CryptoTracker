import { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Loading from '../Components/Loading'

function Coin() {

  const [coin, setCoin] = useState([])
  const [loading, setLoading] = useState(false)
  const coinId = useParams().coinId

  useEffect(()=>{
    const fetchCoinData = (async()=>{
      // Fetch coin data logic 
      try {
        setLoading(true)
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}`)
        console.log(response);
        setTimeout(()=>{   // Simulate loading delay
          setCoin(response.data)
        },500)
      } catch (error) {
        console.error(error.message);
      }
      finally{
        setLoading(false)
      }
    })

    fetchCoinData()
  },[coinId])

  return (
    <div className='coinpage min-h-screen'>
      <Navbar/>
  
      <div className="pt-35 max-w-190 mx-auto sm:pt-25">
        
        {loading && <Loading/>}

        <div className='flex flex-col gap-5 px-4'>
          {/* COIN HEADER */}
          <div className="flex py-5 justify-between items-center gap-2 border border-gray-800 p-2 rounded-lg">
            <div className='flex gap-3 items-center'>
              <img src={coin.image && coin.image.large} alt="Coin Logo" className='w-10 h-10'/>
              <div className="flex flex-col">
                <p className='font-bold'>{coin.name}</p>
                <p>{coin.symbol && coin.symbol.toUpperCase()}</p>
              </div>
            </div>
            <div>
              <p className='bg-blue-600 px-3 py-1 rounded-full'>Rank #{coin.market_cap_rank}</p>
            </div>
          </div>

          {/* COIN PRICE & DETAILS */}
          <div className="flex flex-col gap-4 border-gray-800 border p-5 rounded-lg">
            <div className='text-3xl font-bold'>
              ${coin.market_data && coin.market_data.current_price.usd<0.01?coin.market_data.current_price.usd:coin.market_data && coin.market_data.current_price.usd.toFixed(2)}
            </div> 
            <div>
              <p className={`${coin.market_data && coin.market_data.price_change_percentage_24h_in_currency.usd.toFixed(2) > 0?"text-green-300 bg-green-700 border-green":"text-red-300 bg-red-700"} px-4 py-2 rounded-[10px] w-fit`}>
                {coin.market_data && coin.market_data.price_change_percentage_24h_in_currency.usd.toFixed(2)}% 
              </p>
            </div>
            <div className='flex items-center gap-5'>
              {/* 24h HIGH */}
              <div className='flex flex-col gap-2'>
                <p className='text-gray-600 font-bold'>24h High</p>
                <p className='font-bold'>${coin.market_data && coin.market_data.high_24h.usd.toFixed(2)}</p>
              </div>
              {/* 24h LOW */}
              <div className='flex flex-col gap-2'>
                <p className='text-gray-600 font-bold'>24h Low</p>
                <p className='font-bold'>${coin.market_data && coin.market_data.low_24h.usd.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Coin