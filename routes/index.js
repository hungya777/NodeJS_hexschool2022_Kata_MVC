const HttpController = require("../controllers/http");
const RoomsController = require("../controllers/rooms");

const routes = async(req, res) =>{
  // console.log(req.url);
  // res.end();
  let body = ""; //宣告一個body 字串，來接收前端丟過來的資料
  req.on('data', (chunk) => { //透過req.on('data')來接chunk(片段)資料
    body+=chunk; //將chunk(片段)的資料組合後放在body
  })
  if(req.url == '/rooms' && req.method == "GET"){ //取得所有資料
    RoomsController.getRooms({req, res});
  }else if(req.url == '/rooms' && req.method == "POST" ) { //新增單筆資料
    req.on('end', async ()=>{  //透過req.on('end')方法來使用接回來的資料; 需使用 async確保資料都已經接回來
      RoomsController.createRooms({body, req, res});
    })
  }else if(req.url.startsWith("/rooms/") && req.method == "DELETE"){ //刪除單筆資料
    RoomsController.deleteRooms({req, res});
  }else if(req.url.startsWith("/rooms") && req.method == "PATCH"){ //編輯單筆代辦
    req.on('end', async ()=>{
      RoomsController.updateRooms({body, req, res});
    })
  }else if(req.method == "OPTIONS"){ //cors跨網域
    HttpController.cors(req, res);
  }else {
    HttpController.notFound(req, res);
  }
}

module.exports = routes;