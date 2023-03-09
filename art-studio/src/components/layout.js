
import { useRouter } from "next/router";
import { ethers } from "ethers";
// import MyErc721 from "../artifacts/contracts/NFT.sol/MyErc721.json";
import Connect from "./Connect";

function Layout({ children }) {
 
 
  return (
    <div className="container">

      <nav className="topnav" id="myTopnav">
        
            <a href="/" >
              Home
            </a>
          
            <a href="/create-item"  >
              Sell Digital Asset
            </a>
         
            <a href="/my-assets"  >
              My Digital Asset
            </a>
         
            <a href="/creator-dashboard"  >
              Creator Dashboard
           </a>
           <Connect/>
      </nav>



      <div>{children}</div>
    </div>

  )
}

export default Layout