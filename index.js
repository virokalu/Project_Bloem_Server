
const app = require('./app');

require('dotenv').config();

const port = process.env.PORT;

app.get('/',(req,res)=>{ 
    res.send('Hello World!');
})

app.listen(port,()=>{
    console.log(`http://localhost:${port}`);
})