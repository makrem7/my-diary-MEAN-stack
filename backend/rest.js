const express = require ('express');
const bodyParser = require('body-parser');
const app = express();
diaryEntries=[
    {id: 1, date: "March 1st", entry: "Entry1"},
    {id: 2, date: "March 2st", entry: "Hello"},
    {id: 3, date: "March 3st", entry: "World"}
];
app.use(bodyParser.json());


app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept' );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
})
app.post('/add-entry',(req,res)=>{
    diaryEntries.push({id: req.body.id, date: req.body.date, entry: req.body.entry});
    res.status(200).json({
        message : "Post submitted"
    })
});

app.get('/max-id',(req,res)=>{
    var max = 0 ;
    for (var i=0; i<diaryEntries.length; i++){
        if (diaryEntries[i].id>max){
            max=diaryEntries[i].id;
        }
    }
    res.json({maxId:max});
})

app.get('/diary-entries',(req,res,next)=>{
    res.json({diaryEntries})
})

module.exports=app;