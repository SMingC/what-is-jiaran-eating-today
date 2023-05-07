/*
 *  ┌─────────────────────────────────────────────────────────────┐
 *  │┌───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┐│
 *  ││Esc│!1 │@2 │#3 │$4 │%5 │^6 │&7 │*8 │(9 │)0 │_- │+= │|\ │`~ ││
 *  │├───┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴───┤│
 *  ││ Tab │ Q │ W │ E │ R │ T │ Y │ U │ I │ O │ P │{[ │}] │ BS  ││
 *  │├─────┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴─────┤│
 *  ││ Ctrl │ A │ S │ D │ F │ G │ H │ J │ K │ L │: ;│" '│ Enter  ││
 *  │├──────┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴────┬───┤│
 *  ││ Shift  │ Z │ X │ C │ V │ B │ N │ M │< ,│> .│? /│Shift │Fn ││
 *  │└─────┬──┴┬──┴──┬┴───┴───┴───┴───┴───┴──┬┴───┴┬──┴┬─────┴───┘│
 *  │      │Fn │ Alt │         Space         │ Alt │Win│   HHKB   │
 *  │      └───┴─────┴───────────────────────┴─────┴───┘          │
 *  └─────────────────────────────────────────────────────────────┘
 *
 * @Author       : Seaming
 * @Date         : 2023-05-07
 * @LastEditors  : Seaming
 * @LastEditTime : 2023-05-07
 * @FilePath     : /嘉然今天吃什么/app.js
 * @Description  : 可爱捏
 *
 * Copyright (c) 2023 by Seaming, All Rights Reserved.
 */

const express = require("express");
const cron = require("node-cron");
const nodemailer = require("nodemailer");
const app = express();

require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "qq",
  auth: {
    user: "347552878@qq.com",
    pass: process.env.AUTHENTICATION,
  },
});

const items = [
  { element: "张亮麻辣烫", weight: 2 },
  { element: "小碗菜", weight: 4 },
  { element: "东北菜", weight: 2 },
  { element: "排骨饭", weight: 3 },
];

/**
 * 该函数根据其权重/概率从数组中随机选择一个元素。
 * @param arr - 一个对象数组，其中每个对象代表一个元素及其权重。这些对象有两个属性：“元素”（元素本身）和“权重”（代表该元素被选中的权重/概率的数字）。
 * @returns 函数 randomMale 返回从输入数组 arr 中随机选择的对象的 element 属性，其中选择每个对象的概率与其 weight 属性成正比。
 */
const randomMale = (arr) => {
  const weightSum = arr.reduce((sum, item) => sum + item.weight, 0);

  // 在 0 到权重总和之间生成一个随机数
  const randomNum = Math.random() * weightSum;

  // 从数组中选择一个元素，使其概率与其权重成正比
  let accumulatedWeight = 0;
  for (let i = 0; i < arr.length; i++) {
    accumulatedWeight += arr[i].weight;
    if (randomNum < accumulatedWeight) {
      return arr[i].element;
    }
  }
};

/* 此代码使用“cron”库安排任务在每天上午 11:20 和下午 5:20 运行。当任务运行时，它使用 randomMale 函数从一组具有不同权重/概率的项目中随机选择一个食物项目。然后，它使用
`nodemailer` 库向指定的收件人发送一封电子邮件，其中包含所选的食物作为邮件正文。电子邮件是使用使用电子邮件服务提供商和身份验证信息创建的“传输器”对象发送的。 */
// cron.schedule("20 11,17 * * *", () => {
//   const food = randomMale(items);

//   const mailOptions = {
//     from: "347552878@qq.com",
//     to: ["2063808831@qq.com", "1115499597@qq.com"],
//     subject: "嘉然今天吃什么？",
//     text: `今天我们就去打倒魔王，享用一番来之不易的魔法美食吧~比如香喷喷的${food}！`,
//   };

//   // 在这里编写发送邮件的代码
//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.log(error);
//     } else {
//       console.log("Email sent: " + info.response);
//     }
//   });
// });

const food = randomMale(items);

const mailOptions = {
  from: "347552878@qq.com",
  to: ["2063808831@qq.com", "1115499597@qq.com"],
  subject: "嘉然今天吃什么？",
  text: `今天我们就去打倒魔王，享用一番来之不易的魔法美食吧~比如香喷喷的${food}！`,
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Email sent: " + info.response);
  }
});

module.exports = app;
