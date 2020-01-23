// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

let db = cloud.database();

const _ = db.command;

// 云函数入口函数
exports.main = async (event, context) => {
    var items = [];
    // console.log(event);
    event.itemList.forEach(function(item, index){
      db.collection('events').doc(item).get({
        success: function (res) {
          items.push(res.data);
        }
      })
    })
    // console.log(items);
  return {
    items
  }
}