import smCrypto from "sm-crypto";
const key='' //  前端加密
const key2=''// 解密后端
const sm2 = smCrypto.sm2;
const cipherMode = 1;   // 1 - C1C3C2；	0 - C1C2C3；	默认为1

//加密：
export function doEncrypt(data) {
  let msg = data;
  if (typeof (data) !== "string") {
    msg = JSON.stringify(data);
  }
  return sm2.doEncrypt(msg, key, cipherMode)
}

// 解密：
export function doDecrypt(data) {
  let dodata=sm2.doDecrypt(data, key2, cipherMode)
  let msg=JSON.parse(dodata)
  return msg
}