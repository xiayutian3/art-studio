
function NftCard({nft}){
  return(
      <div className="nftcard">
      <img src={nft.imageUri}
          className="nft-image" />
      <div className="name">{nft.name}</div>
      <div className="desc">{nft.description}</div>
      
      <button className="btn">buy</button>
  </div>
  )
}

export default NftCard