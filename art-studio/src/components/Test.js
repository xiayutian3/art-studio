import { NotificationManager } from 'react-notifications';//提示框
// 测试ipfs本地服务（存储功能）
import { create } from 'ipfs-http-client'
import axios from 'axios'
const clientIpfs = create({ host: '127.0.0.1', port: '5001', protocol: 'http' ,apiPath: '/api/v0' })

// 测试arweave（本身是一个区块链，但是它还附带有本地永久存储的服务，存储功能和ipfs是一样的）本地服务
import useArConnect from 'use-arconnect'


function Test(){
  //测试ipfs 连接，上传
  const connectIpfs = async ()=>{
    const data = {name:'heelo',desc:"hello world"}
    const json = JSON.stringify(data)
    const added = await clientIpfs.add(json)
    console.log('added: ', added);
    // axios访问 
    // http://localhost8080/ipfs/QmccwvdkpnUtn2mHgAHgShBSsqioiJYK834v3gN9nkXDT3

  }


  // 测试aweave存储
  const arconnect = useArConnect()
  const test = async() =>{
    await ArConnect()
    // console.log("aweave连接成功")
    NotificationManager.success("","aweave连接成功");
  }
  const ArConnect = async( )=>{
    //申请钱包 地址 ， 公钥，交易签名， 权限
    await arconnect.connect(["ACCESS_ADDRESS","ACCESS_PUBLIC_KEY","SIGN_TRANSACTION"])
  }


  return (
    <div>
      {/* <div className="buttonCss" onClick={connectIpfs}>测试ipfs上传</div> */}
      <div className="buttonCss" onClick={test}>测试链接aweave</div>
      <style jsx>{`
      .buttonCss{
        float: left;
        display: block;
        text-align: center;
        padding: 14px 16px;
        text-decoration: none;
        font-size: 17px;
        list-style: none;
        margin-right: 2rem;
        cursor: pointer;
      }
    `}
    </style>
    </div>
  
  )
}
export default Test