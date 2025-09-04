const dotenv = require ('@dotenvx/dotenvx');
const connectDB = require ('./configs/db.js');
const app = require ('./app.js');

dotenv.config('.env');

const PORT = process.env.PORT || 3000;
app.listen(PORT, (error)=>{
  if(error){
    console.log(error.message);
    
  }else{
    connectDB()
    console.log('server is started');
    console.log('http://localhost:'+PORT);
    
  }
})
