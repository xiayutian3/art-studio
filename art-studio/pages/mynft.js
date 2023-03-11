import { useEffect, useState } from "react"
import NftCard from "../src/components/NftCard"
import { owned } from "../src/service/nft-service"

function MyNft(){
  const [nfts, setNfts] = useState([])

  useEffect(() => {
    (async () => {
      const ns = await owned()
      if(ns.success){
        setNfts(ns.data)
      }
    })()
  },[])

  return (
    <div className="main">
      {
        nfts.map(nft=>{
          return (
            <NftCard nft={nft} key={nft.tokenId} />
          )
        })
      }
      
    </div>
  )
}

export default MyNft