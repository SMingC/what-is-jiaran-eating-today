/*
 * @Author       : Seaming
 * @Date         : 2023-05-08
 * @LastEditors  : Seaming
 * @LastEditTime : 2023-05-09
 * @FilePath     : /嘉然今天吃什么/src/utils/sendEmail.js
 * @Description  : async way to  get image and send it to the current emails
 *
 * Copyright (c) 2023 by Seaming, All Rights Reserved.
 */

import { schedule } from "node-cron";
import { createTransport } from "nodemailer";
import { canteens, TakeAways } from "../data/food.js";
import { getImageStream } from "./asyncImage.js";
import randomMale from "./randomMale.js";
import rule from "./timeScale.js";

/* 此代码使用 `nodemailer` 库中的 `createTransport` 方法创建一个传输器对象。 transporter
对象用于使用指定的电子邮件服务和身份验证凭据发送电子邮件。在本例中，电子邮件服务为QQ，身份验证凭证包括发件人帐户的电子邮件地址和密码。 */
const transporter = createTransport({
  service: "qq",
  auth: {
    user: "347552878@qq.com",
    pass: "hkhexabdtstabjfj",
  },
});

/**
 * 该函数发送一封电子邮件，其中包含从两个数组中随机选择的食物和一张附加图像。
 */
const sendEmail = () =>
  schedule(rule, async () => {
    console.log("邮件发送中...");
    const canteensFood = randomMale(canteens);
    const takeAwaysFood = randomMale(TakeAways);

    const mailOptions = {
      from: "347552878@qq.com",
      to: ["2063808831@qq.com", "1115499597@qq.com"],
      subject: "嘉然今天吃什么？",
      html: `<div style="background:linear-gradient(180deg,#730040 0,#301cbe 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;text-fill-color:transparent;font-family:'Smiley Sans';font-style:normal;font-weight:700;font-size:24px;line-height:43px">今天我们就去打倒魔王，享用一番来之不易的魔法美食吧~</div><div style="box-sizing:border-box;"><div style=box-sizing:border-box;display:grid;grid-template-rows:repeat(3,auto);margin-top:20px;justify-items:center;justify-content:center;align-items:center><div>比如香喷喷的${canteensFood}！</div><div>如果非要点外卖的话,那就${takeAwaysFood}吧！</div></div></div><img src="https://t.lizi.moe/mp" alt=ss style="max-width:100%;height:60%;width:60%;overflow-clip-margin:content-box;overflow:clip;border-radius:27px;margin-top:40px">`,
      attachments: [
        {
          content: await getImageStream("https://t.lizi.moe/mp"),
          cid: "https://t.lizi.moe/mp",
          contentType: "image/png", // 图片格式，可以根据实际情况修改
        },
      ],
    };

    // 在这里编写发送邮件的代码
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  });

/******************  测试代码   **********************/
// export const sendEmailForText = async () => {
//   const canteensFood = randomMale(canteens);
//   const takeAwaysFood = randomMale(TakeAways);

//   async function getImageStream() {
//     const response = await axios.get("https://t.lizi.moe/mp", {
//       responseType: "arraybuffer", // 以二进制数组形式获取响应内容
//     });
//     const imageBuffer = Buffer.from(response.data, "binary"); // 将二进制数组转为 Buffer 对象
//     return new Readable({
//       read() {
//         this.push(imageBuffer);
//         this.push(null);
//       },
//     });
//   }

//   const mailOptions = {
//     from: "347552878@qq.com",
//     to: ["2063808831@qq.com"],
//     subject: "嘉然今天吃什么？",
//     // html: `<h1>今天我们就去打倒魔王，享用一番来之不易的魔法美食吧~</h1><br /><p style="">比如香喷喷的${canteensFood}！</p>,如果非要点外卖的话,那就${takeAwaysFood}吧！`,
//     html: `<div style="background:linear-gradient(180deg,#730040 0,#301cbe 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;text-fill-color:transparent;font-family:'Smiley Sans';font-style:normal;font-weight:700;font-size:24px;line-height:43px">今天我们就去打倒魔王，享用一番来之不易的魔法美食吧~</div><div style="box-sizing:border-box;"><div style=box-sizing:border-box;display:grid;grid-template-rows:repeat(3,auto);margin-top:20px;justify-items:center;justify-content:center;align-items:center><div>比如香喷喷的${canteensFood}！</div><div>如果非要点外卖的话,那就${takeAwaysFood}吧！</div></div></div><img src="https://t.lizi.moe/mp" alt=ss style="max-width:100%;height:60%;width:60%;overflow-clip-margin:content-box;overflow:clip;border-radius:27px;margin-top:40px">`,
//     attachments: [
//       {
//         content: await getImageStream(),
//         cid: "https://t.lizi.moe/mp",
//         contentType: "image/png", // 图片格式，可以根据实际情况修改
//       },
//     ],
//   };

//   // 在这里编写发送邮件的代码
//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.log(error);
//       return error;
//     } else {
//       console.log("Email sent: " + info.response);
//       return info.response;
//     }
//   });
// };
/*************************************************************** */

export default sendEmail;
