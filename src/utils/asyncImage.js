import axios from "axios";
import { Readable } from "stream";

export async function getImageStream(url) {
  const response = await axios.get(url, {
    responseType: "arraybuffer", // 以二进制数组形式获取响应内容
  });
  const imageBuffer = Buffer.from(response.data, "binary"); // 将二进制数组转为 Buffer 对象
  return new Readable({
    read() {
      this.push(imageBuffer);
      this.push(null);
    },
  });
}
