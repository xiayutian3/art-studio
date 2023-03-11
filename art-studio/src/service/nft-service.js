import { ethers } from "ethers";
import { rpcUrl } from "../config";
import { trying } from "./ConnectionService";
import { NetworkConfiguration } from "../config";
import NFT from "../../contract/artifacts/contracts/NFT.sol/MyErc721.json";
import { NotificationManager } from "react-notifications";
import axios from "axios";

// 某个账号的nft总数
export const owned = async () => {
  const { success, provider, signer } = await trying(); //登陆账号，链接小狐狸
  if (!success){
    NotificationManager.warning("", "network not right!", 6000);
    return {success:false}
  } 

  const address = await signer.getAddress();

  const nft = new ethers.Contract(
    NetworkConfiguration.nftAddress,
    NFT.abi,
    provider
  );//只能使用合约的读方法

  let count = await nft.balanceOf(address);
  count = count.toNumber()
  // console.log('count: ', count);
  //组装所有token的Meta数据，在页面渲染
  const rst = await Promise.all(
    Array.from({length:count}).map(async(v,i)=>{
      const tokenId = await nft.tokenOfOwnerByIndex(address,i)
      const tokenUri = await nft.tokenURI(tokenId)
      const meta = await axios.get(tokenUri)
      return {
        ...meta.data,
        tokenId,
        tokenUri
      }
    })
  )

  return {success:true,data:rst}
};
// 合约的nft总数
export const totalsupply = async () => {
  const provider = new ethers.providers.JsonRpcProvider(rpcUrl());

  const nft = new ethers.Contract(
    NetworkConfiguration.nftAddress,
    NFT.abi,
    provider
  );
  const total = await nft.totalSupply();
  return total;
};

// 铸造nft函数
export const mintNFT = async (tokenUri) => {
  const { success, provider, signer } = await trying(); //登陆账号，链接小狐狸
  if (!success){
    NotificationManager.warning("", "network not right!", 6000);
    return {success:false}
  } 

  let nft = new ethers.Contract(
    NetworkConfiguration.nftAddress,
    NFT.abi,
    signer
  ); // signer 实例化的合约可以修改状态

  const address = await signer.getAddress();
  let transaction = await nft
    .connect(signer)
    .mint(address, tokenUri, { value: 1*10**9 });
  let tx = await transaction.wait();
  let event = tx.events[0];//获取事件消息数据
  let value = event.args[2];
  let tokenId = value.toNumber();
  return {success:true, tokenId}
};
