const express = require ('express');

const app = express();
diaryEntries=[
    {id: 1, date: "March 1st", entry: "Entry1"},
    {id: 2, date: "March 2st", entry: "Hello"},
    {id: 3, date: "March 3st", entry: "World"}
];

app.use('/diary-entries',(req,res,next)=>{
    res.json({diaryEntries})
})

module.exports=app;