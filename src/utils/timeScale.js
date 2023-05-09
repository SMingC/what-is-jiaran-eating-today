import moment from "moment-timezone";
import schedule from "node-schedule";

moment.tz.setDefault("Asia/Shanghai");

const rule = new schedule.RecurrenceRule();
rule.minute = 20;
rule.hour = [11, 17];

export default rule;
