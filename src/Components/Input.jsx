function Input({searchCrypto, setSearchCrypto}) {
  return (
    <div>
        {/* SEARCH BOX */}
        <input type="text" placeholder="Search cryptocurrencies..." value={searchCrypto} className="flex-1 bg-gray-900 p-2 rounded-2xl placeholder:px-2 shadow-lg shadow-gray-800" onChange={(e)=>{setSearchCrypto(e.target.value)}}/>
    </div>
  )
}

export default Input