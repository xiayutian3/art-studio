import React, { useState } from "react";
// 使用Arweave的储存功能
import Arweave from "arweave";
import { NotificationManager } from "react-notifications"; //提示框
// Arweave GraphQL 的查询语句封装
import { recipientQuery, ownersQuery } from '../service/arweave-query-api';

const arweave = Arweave.init({
  host: "127.0.0.1",
  port: 1984,
  protocol: "http",
});

// Arweave博文储存

function BlogContent(){
  const [ content, updateContent ] = useState("");

  const publishPost = async()=>{
    if(!content){
      alert("请输入内容")
      return
    }
    //用于 Arweave GraphQL 的tag  
    // 资料地址 https://gql-guide.vercel.app/#full-data
    const tags = {"Content-Type": "text/html", "Domain-Type":"article",title:"Blog"}
    const url = await storeArticle(content, tags) //上传至Arweave储存
    alert(url)
  }

  //上传至Arweave储存
  const storeArticle  = async(data, tags)=>{
    let tx = await arweave.createTransaction({
      data: data,
    });
    // 遍历添加tag，方便 Arweave GraphQL的检索
    Object.keys(tags).forEach(key=>{
      tx.addTag(key, tags[key])
    })
    // tx.addTag('Content-Type', 'image/jpg');
    await arweave.transactions.sign(tx); //签名交易
    // 上传资源
    const response = await arweave.transactions.post(tx);
    const myurl = "http://127.0.0.1:1984/" + tx.id; //访问资源的路径
    NotificationManager.success("上传成功", myurl);
    return myurl;
  }

  // Arweave GraphQL 的查询
  // 查询我的文章
  const myArticles = async () => {

    try {
        const wallet = window.arweaveWallet
        const currentAddress = await wallet.getActiveAddress()
 
        const query = ownersQuery(currentAddress);
        const results = await arweave.api.post(`graphql`, query)
            .catch(err => {
                console.error('GraphQL query failed');
                throw new Error(err)
            });

        const edges = results.data.data.transactions.edges;
        return edges;
    }
    catch (error) {
        console.log(error);
    }
}
  

  return (
    <div>
      <h1>博文开发</h1>
      <textarea
          placeholder="Asset Description"
          onChange={(e) => updateContent( e.target.value )}
        />
        <div>
          <button onClick={publishPost}>发布</button>
        </div>
    </div>
  )
}

export default BlogContent;