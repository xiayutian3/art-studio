import { create } from "ipfs-http-client";
import styles from "./NftMintor.module.css";
import React, { useState } from "react";
import { useRouter } from "next/router";
import {mintNFT} from "../service/nft-service"
const clientIpfs = create({
  host: "127.0.0.1",
  port: "5001",
  protocol: "http",
  apiPath: "/api/v0",
});

function NftMinter() {
  const router = useRouter()
  // nft元数据
  const [meta, updateMeta] = useState({ name: "", description: "" });
  const [ uri, updateUri ] = useState("");

  //获取图片上传的cid和uri
  const onChange = async (e) => {
    const image = e.target.files[0];
    const added = await clientIpfs.add(image);
    const cid = added.path; //获取图片上传ipfs服务器后的cid
    const imageUri = "http://127.0.0.1:8080/ipfs/" + cid; //访问图片的路径
    // http://127.0.0.1:8080/ipfs/QmQF2G6g9zQG2fQpEHPTEhscMTMTC5QqimHg4TqCjs7TQA
    updateUri(imageUri);
  };

  // 构建元数据，上传ipfs
  const mint = async () => {
    // http://127.0.0.1:8080/ipfs/QmQ64DtNoRf5Lxvse9n3dKU2KpnSEQCZqkSLvfje3KU9Vu
    // http://127.0.0.1:8080/ipfs/QmRWZbfqa36BVZPqxrPwy6KgE3T5vW9d8zzyJkXhUayQSh
    // http://127.0.0.1:8080/ipfs/QmeRS1qqzoCgxNTCe1g8ZkvvNm1XCnrLX2c1nGDszQSGnx
    const data = { ...meta, imageUri: uri };
    const json = JSON.stringify(data);
    const added = await clientIpfs.add(json);
    const tokenUri = "http://127.0.0.1:8080/ipfs/" + added.path;
    // console.log('tokenUri: ', tokenUri);
    const {success,tokenId} = await mintNFT(tokenUri) //创建nft
    if(success){
      router.push("/mynft") //跳转nft展示界面
      // console.log('tokenId: ', tokenId);
    }
    
  };

  return (
    <div className={styles.CreatorWrapper}>
      <div className={styles.CreatorContainer}>
        <input
          placeholder="Asset Name"
          className={styles.NftField}
          onChange={(e) => updateMeta({ ...meta, name: e.target.value })}
        />
        <textarea
          placeholder="Asset Description"
          className={styles.NftField}
          onChange={(e) => updateMeta({ ...meta, description: e.target.value })}
        />

        <input
          type="file"
          placeholder="Asset Image"
          className="my-4"
          onChange={onChange}
        />

        <img width="350" className={styles.NftImage} />

        <button
          className="mt-8 bg-blue-500 text-white rounded p-4"
          onClick={mint}
        >
          Create Item
        </button>
      </div>
    </div>
  );
}

export default NftMinter;
