// 使用Arweave的储存功能
import Arweave from "arweave";
import { NotificationManager } from "react-notifications"; //提示框

const arweave = Arweave.init({
  host: "127.0.0.1",
  port: 1984,
  protocol: "http",
});

// 上传（meta，json）资源Arweave
export const toArweave = async (data) => {
  let tx = await arweave.createTransaction({
    data: data,
  });
  // tx.addTag('Content-Type', 'image/jpg');
  await arweave.transactions.sign(tx); //签名交易
  // 上传资源
  const response = await arweave.transactions.post(tx);
  const myurl = "http://127.0.0.1:1984/" + tx.id; //访问资源的路径
  NotificationManager.success("上传成功", myurl);
  return myurl;
};

// 上传图片资源 Arweave (暂时不支持图片直接上传，所以需要处理一下，图片相关)
export const imageToArweave = async (file) => {
  const data = await readImageFile(file);
  const url = toArweave(data);
  return url;
};

//获取图片资源
const readImageFile = (file) => {
  const reader = new FileReader();
  return new Promise((resolve, reject) => {
    reader.readAsArrayBuffer(file)
    reader.onload = (event) => {
      resolve(event.target.result);
    };
    reader.onerror = (event) => {
      reject(event);
    };
  });
};
