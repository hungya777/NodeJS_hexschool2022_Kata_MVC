const mongoose = require("mongoose"); //載入mongoose套件，目的用來連接資料庫
const dotenv = require('dotenv'); //載入dotenv套件，用來管理環境變數
dotenv.config({path:"./config.env"}); //根目錄上的.env的檔案路徑

const DB = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD); //用replace()去替換字串的方法

//連接資料庫
mongoose.connect(DB)
  .then(()=>{
    console.log('資料庫連線成功');
  })
  .catch((error)=>{
    console.log(error);
  })