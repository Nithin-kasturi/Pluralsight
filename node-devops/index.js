const express=require('express');
const app=express();
const PORT=3000;
app.get('/',(req,res)=>{
    res.send('Hello world');
});
app.get('/name',(req,res)=>{
    res.send('Kasturi Nithin');
});
app.listen(PORT,()=>{
    console.log(`Server running at ${PORT}`)
})