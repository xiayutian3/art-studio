import Head from "next/head";
import styles from "../styles/Home.module.css";
import { ethers } from "ethers";
// import Lock from '../contract/artifacts/contracts/Lock.sol/Lock.json'
import MyErc721 from '../contract/artifacts/contracts/NFT.sol/MyErc721.json'
// console.log('MyErc721: ', MyErc721);

export default function Home() {

  //连接metamask钱包
  const connect = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    await provider.send("eth_requestAccounts", []);//调起连接小狐狸并登录账号，一次性的动作，第二次点击连接没反应了，因为已经连接了
    const signer = provider.getSigner()  //拿到一个账号
    console.log('signer: ', signer);
  };

  // 连接合约,调用合约
  const call_contract = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    await provider.send("eth_requestAccounts", []);//调起连接小狐狸并登录账号，一次性的动作，第二次点击连接没反应了，因为已经连接了
    const signer = provider.getSigner() //拿到一个账号
    // console.log('signer: ', signer);

    // 实例化合约
    const lock = new ethers.Contract('0x5FbDB2315678afecb367f032d93F642f64180aa3' , MyErc721.abi , signer ) //传入signer， 之后都用这个账号去操作
    const signerAcount = await signer.getAddress();//获取账户地址
    const transaction = await lock.mint(signerAcount, 'https://learnblockchain.cn/docs/hardhat/guides/ganache-tests.html',{value:1*10**9});//生成交易，等待旷工挖矿
    const txReceipt = await transaction.wait(); //等待交易执行完
    const transferEvents = txReceipt.events;
    const {from,to, tokenId} = transferEvents[0].args; //合约外部调用，函数的返回值只能通过事件event去取
    alert('from:'+ from.toString()+ 'to:' + to.toString() + 'tokenId:'+tokenId.toString());
  }
  
  return (
    <div className={styles.container}>
      <Head>
        <title>艺术家工作室</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className={styles.grid}>
          <button className={styles.card} onClick={connect}>
            <p>连接钱包</p>
          </button>
          <button className={styles.card} onClick={call_contract}>
            <p>合约调用</p>
          </button>
        </div>
      </main>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel" className={styles.logo} />
        </a>
      </footer>

      <style jsx>{`
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        footer img {
          margin-left: 0.5rem;
        }
        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          color: inherit;
        }
        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
