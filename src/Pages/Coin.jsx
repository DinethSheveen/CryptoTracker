import { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Loading from '../Components/Loading'
import { formatMarketCap } from '../Utils/currencyFormatters'
import { LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Line } from 'recharts'

function Coin() {

  const [coin, setCoin] = useState([])
  const [chartData, setChartDate] = useState([])
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

  useEffect(()=>{
    const fetchChartData = async()=>{
      try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=7`)
        console.log("chart = ",response);
        const formattedData = response.data.prices.map((price)=>{
          return (
            {
              time : new Date(price[0]).toLocaleDateString("en-US",{month:"short", day:"numeric"}),
              price : price[1].toFixed(2)
            }
          )
        })
        setChartDate(formattedData)
      } catch (error) {
        console.error(error.message);
      }
    }
    fetchChartData()

  },[coinId])

  return (
    <div className='coinpage min-h-screen'>
      <Navbar/>
  
      <div className="pt-35 max-w-190 mx-auto sm:pt-25">
        
        {loading ?<Loading/>:

        <div className='flex flex-col gap-5 px-4 py-4'>
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
              ${coin.market_data && coin.market_data.current_price.usd<0.01?coin.market_data.current_price.usd:coin.market_data && coin.market_data.current_price.usd.toLocaleString("en-US",{minimumFractionDigits: 2, maximumFractionDigits: 2})}
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

          {/* COIN CHART */}  
          <div className="chart border border-gray-800 p-5 rounded-lg">
            <p className='text-gray-600 font-bold'>Price Chart (7days)</p>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke = "#4b5563"/>
                <XAxis dataKey="time" stroke='#9ca3af'/>
                <YAxis stroke='#9ca3af' domain={["auto","auto"]}/>
                <Tooltip contentStyle={{color:"#e0e0e0",borderRadius:"8px",border:"1px solid rgba(255,255,255,0.1)",backgroundColor:"rgba(20,20,40,0.95)"}}/>
                <Line type="monotone" dataKey="price" stroke="#3b82f6" strokeWidth={2} dot={false}/>
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* COIN MARKET CAP & VOLUME */}
          <div className="flex flex-col gap-4 border-gray-800 border p-5 rounded-lg">
            <p className='text-gray-600 font-bold'>Market Cap</p>
            <p className='font-bold'>${formatMarketCap(coin.market_data && coin.market_data.market_cap.usd.toFixed(2))}</p>
          </div>

          <div className="flex flex-col gap-4 border-gray-800 border p-5 rounded-lg">
            <p className='text-gray-600 font-bold'>Volume (24h)</p>
            <p className='font-bold'>${formatMarketCap(coin.market_data && coin.market_data.total_volume.usd.toFixed(2))}</p>
          </div>
          
          <div className="flex flex-col gap-4 border-gray-800 border p-5 rounded-lg">
            <p className='text-gray-600 font-bold'>Circulating Supply</p>
            <p className='font-bold'>${coin.market_data && coin.market_data.circulating_supply.toLocaleString("en-US",{minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
          </div>

          <div className="flex flex-col gap-4 border-gray-800 border p-5 rounded-lg">
            <p className='text-gray-600 font-bold'>Total Supply</p>
            <p className='font-bold'>${coin.market_data && coin.market_data.total_supply.toLocaleString("en-US",{minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
          </div>
        </div>
        }
      </div>
    </div>
  )
}

export default Coin