import { create } from 'ipfs-http-client'
import axios from 'axios'
const clientIpfs = create({ host: '127.0.0.1', port: '5001', protocol: 'http' ,apiPath: '/api/v0' })

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

  return (
    <div>
      <div className="buttonCss" onClick={connectIpfs}>测试</div>

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