const app = require("./index");

const connect = require("./configs/db");

app.listen(3333, async()=>{
    try{
        await connect();
        console.log("listening on port 3333");
    }catch(err){
        console.error(err.message);
    }
   
});