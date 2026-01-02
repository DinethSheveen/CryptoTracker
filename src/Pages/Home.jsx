import axios from 'axios'
import { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import CryptoCards from '../Components/CryptoCards'
import Loading from '../Components/Loading'

function Home() {

  const [cryptos, setCryptos] = useState(null)
  const [layout, setLayout] = useState("grid")
  const [loading, setLoading] = useState(false)

  const API_KEY = import.meta.env.VITE_API_KEY

  useEffect(()=>{
    const fetchCrypto = async()=>{
      try {
        setLoading(true)
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&x_cg_demo_api_key=${API_KEY}`)
        setCryptos(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error.message);
      }
      finally{
        setLoading(false)
      }
    }
    fetchCrypto() 
  },[])

  return (
    <div className='min-h-screen'>
      <Navbar/>

      <div className="home pt-40 sm:pt-30">
        <div className="flex justify-center items-center max-w-190 mx-auto gap-7 flex-wrap">
          {/* SORT */}
          <div className='flex items-center justify-center gap-2'>
            <p>Sort by :</p>
        
            <select className='bg-gray-900 p-1 rounded-[10px]'>
              <option value="Rank">Rank</option>
              <option value="Price (low to high)">Price (low to high)</option>
              <option value="Price (high to low)">Price (high to low)</option>
            </select>
          </div>
          {/* LAYOUT SELECTION */}
          <div className='flex gap-2'>
            <div className={`px-4 py-1 rounded-[5px] transition-all duration-350 ${layout==="grid"?"bg-blue-600":"bg-gray-800"}`} onClick={()=>{setLayout("grid")}}>Grid</div>
            <div className={`px-4 py-1 rounded-[5px] transition-all duration-350 ${layout==="list"?"bg-blue-600":"bg-gray-800"}`} onClick={()=>{setLayout("list")}}>List</div>
          </div>
        </div>

        {loading && <Loading/>}

        {/* CRYPTOS */}
        <div className={layout==="grid"?`mt-10 grid grid-cols-1 gap-4 mx-auto px-8 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:max-w-290 lg:mx-auto`:`mt-10 grid-cols-1 max-w-190 mx-auto gap-4`}>

        {
          cryptos && cryptos.map((crypto)=>{
            return (
              <CryptoCards crypto={crypto} key={crypto.id}/>
            )
          })
        }
        </div>
      </div>
    </div>
  )
}

export default Home