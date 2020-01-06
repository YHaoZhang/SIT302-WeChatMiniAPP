// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

let db = cloud.database();

const _ = db.command;

// 云函数入口函数
exports.main = async (event, context) => {
  return await db.collection("students").doc(event.studentID).update({
    data: {
      events: _.push(event.eventID)
    }
  })
}