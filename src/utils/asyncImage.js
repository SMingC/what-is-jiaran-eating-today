import axios from "axios";
import { Readable } from "stream";

/**
 * 此函数从给定的 URL 检索图像并将其作为可读流返回。
 * @param url - 要作为流检索的图像的 URL。
 * @returns 包含来自指定 URL 的图像数据的可读流。
 */
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
