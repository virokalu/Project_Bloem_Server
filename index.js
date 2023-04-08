
const app = require('./app');

require('dotenv').config();

const port = process.env.PORT;

app.get('/',(req,res)=>{ 
    res.send('Hello World!');
})

app.get('/chartdata', (req, res) => {
    const data = [
      { _id: "642e8aecc7cd8cab61975ffb",day: '1', sum: 2, color: 'blueGrey' ,username: 'manoj', __v: 0},
      { day: '2', sum: 20, color: 'blueGrey' },
      { day: '3', sum: 4, color: 'blueGrey' },
      { day: '4', sum: 10, color: 'blueGrey' },
      { day: '5', sum: 21, color: 'blueGrey' },
      { day: '6', sum: 200, color: 'blueGrey' },
      { day: '7', sum: 200, color: 'blueGrey' },
    ];
    res.json(data);
    console.log(data);
  })

app.listen(port,()=>{
    console.log(`http://localhost:${port}`);
})