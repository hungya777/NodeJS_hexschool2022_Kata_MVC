const errorHandle = require("../service/errorHandle");  //失敗:錯誤處理
const successHandle = require("../service/successHandle"); //成功，回傳資訊
const Room = require("../models/room"); //載入自訂義的Model-Room（房型模組規格）
//載入自訂義 回應處理資訊

const rooms = {
  async getRooms({req, res}) {
    const totalRooms = await Room.find();
    successHandle(res, totalRooms);
  },
  async createRooms({body, req, res}) {
    try { //加上try catch的目的是避免資料出現問題(因編譯資料有可能會失敗)
      const data = JSON.parse(body); //JSON.parse() 將 JSON 字串轉換為物件。
      const newRoom = await Room.create( //加上await等待將資料寫回資料庫
        {
          name: data.name,
          price: data.price,
          rating: data.rating
        }
      )
      successHandle(res, newRoom);
    }catch(err){
      errorHandle(res, err);
    }
  },
  async deleteRooms({req, res}) {
    try{
      const id = req.url.split('/').pop();
      // console.log(id);
      const delteRoom = await Room.findByIdAndDelete(id);
      successHandle(res, delteRoom);
    }catch(err){
      errorHandle(res, err);
    }
  },
  async updateRooms({body, req, res}) {
    try{
      const id = req.url.split('/').pop();
      const updateData = JSON.parse(body);
      const updateRoom = await Room.findByIdAndUpdate(id, updateData);
      successHandle(res, updateRoom);
    }catch(err){
      errorHandle(res, err);
    }
  }
}

module.exports = rooms;