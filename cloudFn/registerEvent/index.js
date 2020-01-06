// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

let db = cloud.database();

const _ = db.command;

// 云函数入口函数
exports.main = async (event, context) => {
  return await db.collection("events").doc(event.eventID).update({
    data:{
      participants: _.push(
        {
          id: event.studentID,
          name: event.name,
          phone: event.phone
        }
      )
    }
    
  })
}