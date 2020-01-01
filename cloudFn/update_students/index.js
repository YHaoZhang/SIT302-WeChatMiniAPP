// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

let db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  return await db.collection('students').doc(event.id).update({
    data:{
      firstname: event.firstname,
      lastname: event.lastname,
      gender: event.gender,
      birthday: event.birthday,
      phone_in_aus: event.phone_in_aus,
      phone_in_china: event.phone_in_china,
      email_address: event.email_address
    }
  })
}