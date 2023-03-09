//连接网络的函数

import { ethers } from "ethers";
import { NetworkConfiguration } from '../config'
import { NotificationManager } from 'react-notifications';//提示框

//链接网络，获取网络的配置数据
export const connectOnce = async () => {  
    let provider = new ethers.providers.Web3Provider(window.ethereum) //链接区块链
    await provider.send("eth_requestAccounts", []); //请求metamask连接账号,登录
    let signer = provider.getSigner(); //获取登录的账号对象
    let network = await provider.getNetwork(); //获取连接的网络对象 
    let address = await signer.getAddress(); //获取账号地址
    return{chainId:network.chainId, address: address, provider, signer};
}

export const trying = async () => {
    const {chainId, address, provider, signer} = await connectOnce();
    const supported = NetworkConfiguration.chainId.toString();
    // 判断此时的metamask连接的网络与我们应用支持的网络是否相一致，不一致的话强制metamask添加我们应用支持的网络，并提示用户连接到相应的网络
    if (chainId == supported) {
        NotificationManager.success('', 'chainId: ' + chainId + "      account: " + address.substring(0, 5) + "..", 3000);
        return {success:true, provider, signer};
    }
    NotificationManager.warning('', 'chainId: ' + chainId + "      account: " + address.substring(0, 5) + "..", 3000);
    return {success:false};
}

export const connect = async () => {
    let {success} = await trying();//尝试连接区块链网络
    if(success)
        return;
    
    await window.ethereum.request({ //强制metamask添加我们的网络配置,切换过去
        method: "wallet_addEthereumChain",
        params: NetworkConfiguration.params

    });
    await trying();

} 