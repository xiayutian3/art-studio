import { ethers } from "ethers";
import {NotificationContainer} from 'react-notifications';//提示框
import 'react-notifications/lib/notifications.css';
import { connect } from '../service/ConnectionService'

const buttonCss = {
  "float": "left",
  "display": "block",
  "textAlign": "center",
  "padding": "14px 16px",
  "textDecoration": "none",
  "fontSize": "17px",
  "listStyle": "none",
  "marginRight": "2rem",
  "cursor": "pointer"
};

function Connect({ children }) {
  // //连接metamask钱包
  // const connect = async () => {
  //   const provider = new ethers.providers.Web3Provider(window.ethereum);
  //   await provider.send("eth_requestAccounts", []); //调起连接小狐狸并登录账号，一次性的动作，第二次点击连接没反应了，因为已经连接了
  //   const signer = provider.getSigner(); //拿到一个账号
  //   console.log("signer: ", signer);
  // };

  //连接metamask钱包
  const connectWallet = async () => {
    await connect();
  }

  return (
    <div>
      <NotificationContainer/>
      <div style={buttonCss} onClick={connectWallet}>connect</div>
    </div>
  );
}


export default Connect;
