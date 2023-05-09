import moment from "moment-timezone";
import schedule from "node-schedule";

/* `moment.tz.setDefault("Asia/Shanghai");` 将 `moment`
库的默认时区设置为“Asia/Shanghai”。这意味着任何未指定时区的“时刻”对象都将使用“亚洲/上海”作为默认时区。 */
moment.tz.setDefault("Asia/Shanghai");

/* 此代码正在从 `node-schedule` 库中创建 `RecurrenceRule` 类的新实例，并设置其属性以指定循环计划。具体来说，它将“minute”属性设置为
20，将“hour”属性设置为包含值 11 和 17 的数组。这意味着计划将在每天上午 11:20 和下午 5:20 触发。 */
const rule = new schedule.RecurrenceRule();
rule.minute = 20;
rule.hour = [11, 17];

export default rule;
