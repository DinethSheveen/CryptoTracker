import axios from 'axios'
import { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import CryptoCards from '../Components/CryptoCards'
import Loading from '../Components/Loading'

function Home() {

  const [allCryptos, setAllCryptos] = useState([])
  const [cryptos, setCryptos] = useState([])
  const [layout, setLayout] = useState("grid")
  const [loading, setLoading] = useState(false)
  const [sortType, setSortType] = useState("")
  const [searchCrypto, setSearchCrypto] = useState("")

  const API_KEY = import.meta.env.VITE_API_KEY

  // FETCH CRYPTO DATA
  useEffect(()=>{
    const fetchCrypto = async()=>{
      try {
        setLoading(true)
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&x_cg_demo_api_key=${API_KEY}`)
        setAllCryptos(response.data);     // Store original data for sorting reference
        setCryptos(response.data);    // Store data to be displayed
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

  // SORTING LOGIC
  useEffect(() => {
    if (!cryptos) return;

    let sorted = [...allCryptos];

    switch (sortType) {
      case "Rank":
        sorted.sort((a, b) => a.market_cap_rank - b.market_cap_rank);
        break;

      case "Name":
        sorted.sort((a, b) => a.id.localeCompare(b.id));
        break;

      case "Price change 24h":
        sorted.sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
        break;

      case "Price (low to high)":
        sorted.sort((a, b) => a.current_price - b.current_price);
        break;

      case "Price (high to low)":
        sorted.sort((a, b) => b.current_price - a.current_price);
        break;

      default:
        break;
    }
  setCryptos(sorted); 
}, [sortType]);  

  // SEARCH LOGIC
  useEffect(()=>{
    if (!searchCrypto){
      setCryptos(allCryptos)
      return
    }

    const data = [...allCryptos];

    const filteredCryptos = data.filter((crypto)=>crypto.id.toLowerCase().includes(searchCrypto.toLowerCase()) || crypto.symbol.toLowerCase().includes(searchCrypto.toLocaleLowerCase()))

    if(filteredCryptos.length===0 || searchCrypto===""){
      setCryptos(cryptos)
      return
    }

    setCryptos(filteredCryptos)
  }, [searchCrypto])

  return (
    <div className='min-h-screen'>
      <Navbar searchCrypto={searchCrypto} setSearchCrypto={setSearchCrypto}/>

      <div className="home pt-40 sm:pt-30">
        <div className="flex justify-center items-center max-w-190 mx-auto gap-7 flex-wrap">
          {/* SORT */}
          <div className='flex items-center justify-center gap-2'>
            <p>Sort by :</p>
        
            <select className='bg-gray-900 p-1 rounded-[10px] cursor-pointer' onChange={(e)=>{setSortType(e.target.value)}}>
              <option value="Rank">Rank</option>
              <option value="Name">Name</option>
              <option value="Price change 24h">Price change 24h</option>
              <option value="Price (low to high)">Price (low to high)</option>
              <option value="Price (high to low)">Price (high to low)</option>
            </select>
          </div>
          {/* LAYOUT SELECTION */}
          <div className='flex gap-2'>
            <div className={`px-4 py-1 rounded-[5px] transition-all duration-350 cursor-pointer ${layout==="grid"?"bg-blue-600":"bg-gray-800"}`} onClick={()=>{setLayout("grid")}}>Grid</div>
            <div className={`px-4 py-1 rounded-[5px] transition-all duration-350 cursor-pointer ${layout==="list"?"bg-blue-600":"bg-gray-800"}`} onClick={()=>{setLayout("list")}}>List</div>
          </div>
        </div>

        {loading && <Loading/>}

        {/* CRYPTOS */}
        <div className='h-110 mt-10 overflow-scroll scrollbar-hide md:h-170 lg:h-210 2xl:h-350'>
          <div className={`px-4 mx-auto grid ${layout==="grid"?` grid grid-cols-1 gap-4 mx-auto xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:max-w-290 lg:mx-auto`:`grid-cols-1 max-w-190 mx-auto gap-4`}`}>

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
    </div>
  )
}

export default Home