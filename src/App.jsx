import { Route, Routes } from "react-router-dom"
import Home from "./Pages/Home"
import Coin from "./Pages/Coin"

function App() {
  return (
    <div className="bg-black text-white">
      <Routes>
        <Route path="/" element={<Home/>}></Route>  
        <Route path="/Crypto-coin/:coinId" element={<Coin/>}></Route>  
      </Routes> 
    </div>
  )
}

export default App