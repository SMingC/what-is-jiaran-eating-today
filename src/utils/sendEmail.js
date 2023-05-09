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

import schedule from "node-schedule";
import { createTransport } from "nodemailer";
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
 * 该函数向指定收件人发送一封电子邮件，其中包含从两个数组中随机选择的食物选项和一张附加图像。
 * @param sendToArr - 电子邮件将发送到的一组电子邮件地址。
 * @param canteens - 这可能是食堂提供的一系列食物选择。
 * @param TakeAways - 它可能是一系列可供外卖或从餐馆送货的食物选择。
 */
const sendEmail = (sendToArr, canteens, TakeAways) =>
  schedule.scheduleJob(rule, async () => {
    console.log("邮件发送中...");
    const canteensFood = randomMale(canteens);
    const takeAwaysFood = randomMale(TakeAways);

    const mailOptions = {
      from: "347552878@qq.com",
      to: sendToArr,
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

export default sendEmail;
