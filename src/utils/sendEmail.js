import { schedule } from "node-cron";
import { createTransport } from "nodemailer";
import { canteens, TakeAways } from "../data/food.js";
import randomMale from "./randomMale.js";

const transporter = createTransport({
  service: "qq",
  auth: {
    user: "347552878@qq.com",
    pass: "hkhexabdtstabjfj",
  },
});

/* 此代码使用“cron”库安排任务在每天上午 11:20 和下午 5:20 运行。当任务运行时，它使用 randomMale 函数从一组具有不同权重/概率的项目中随机选择一个食物项目。然后，它使用
`nodemailer` 库向指定的收件人发送一封电子邮件，其中包含所选的食物作为邮件正文。电子邮件是使用使用电子邮件服务提供商和身份验证信息创建的“传输器”对象发送的。 */
const sendEmail = () => {
  schedule("20 11,17 * * *", () => {
    const canteensFood = randomMale(canteens);
    const takeAwaysFood = randomMale(TakeAways);

    const mailOptions = {
      from: "347552878@qq.com",
      to: ["2063808831@qq.com", "1115499597@qq.com"],
      subject: "嘉然今天吃什么？",
      text: `今天我们就去打倒魔王，享用一番来之不易的魔法美食吧~比如香喷喷的${canteensFood}！,如果非要点外卖的话,那就${takeAwaysFood}吧！`,
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
};

export default sendEmail;
