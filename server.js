const exp = require('constants');
const express = require('express');
const fs = require('fs');
const app = express();
const path = require('path');
const PORT = process.env.PORT ||3000;

const resRouter = require('./routers/res-router');

app.locals.restaurants = [];
app.locals.id = 0;

app.set(path.join(__dirname,'views'));
app.set('view engine','pug');
app.use(express.static(path.join(__dirname,'public')));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use((req,res,next)=>{
    console.log(`${req.method}: ${req.url}`);
    next();
})
//handling requests
app.get(['/','/home'],(req,res)=>res.render('home'));
app.get(['/addRestaurant'],(req,res)=>res.render('add'));
app.use('/restaurants',resRouter);

//reading the files located in the restaurants directory
fs.readdir("./restaurants",(err,files)=>{
    if(err) return console.log(err);
    for(let i=0;i<files.length;i++){
        let rest = require("./restaurants/"+files[i]);
        app.locals.restaurants.push(rest);
        app.locals.id++;
    }
    app.listen(PORT);
    console.log(`Server running at http://127.0.0.1:${PORT}/`);
});