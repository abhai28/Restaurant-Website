/*
    As stated in readme routers were learned from gabriel during his workshop and office hours
 */
const express = require('express');
const router = express.Router();
//handling requests to /restaurants
router.get('/',sendRestaurants);
router.post('/',createRestaurant);
router.param('restID',findRest);
router.get('/:restID',sendRest);
router.put('/:restID',updateRestaurant);
//function used to find the restaurant with the specific id
function findRest(req,res,next,value){
    for(let i=0;i<req.app.locals.id;i++){
        if(req.app.locals.restaurants[i].id===parseInt(value)){
            req.rest = req.app.locals.restaurants[i];
        }
    }

    if(!req.rest){
        return res.status(404).send('Restaurant does not exist');
    }
    next();
}
//function used to send a array of restaurant ID's or load a page of list of restaurants
function sendRestaurants(req,res){
    let restaurantID = {restaurants:[]}
    for(rest in req.app.locals.restaurants){
        restaurantID.restaurants.push(parseInt(rest));
    }
    res.format({
        'application/json':()=>res.send(JSON.stringify(restaurantID)),
        'text/html':()=> res.render('restaurants',{restaurants:req.app.locals.restaurants})
    });
}
//function called on post request it saves the new restaurant to the restaurants array
function createRestaurant(req,res){
    let body = "";
    req.on('data',(data)=>{
        body+=data;
    });

    req.on('end',()=>{
        let newRest = JSON.parse(body);
        if(newRest.name!==null&&newRest.delivery_fee!==null&&newRest.min_order!==null){
            newRest.id = req.app.locals.id;
            req.app.locals.id++;
            newRest.menu = {};
            req.app.locals.restaurants.push(newRest);
        }
        res.status(200);
        res.write(JSON.stringify(newRest.id));
        res.end();
    });
}
//function called on GET /restID it either returns a json which has restaurant info or loads a page
function sendRest(req,res){
    res.format({
        'application/json':()=>res.send(JSON.stringify(req.rest)),
        'text/html':()=>  res.render('addRest',{rest:req.rest,categories:Object.keys(req.rest.menu)})
    });
}
//Function called on PUT /restID it updates the information of the restaurant
function updateRestaurant(req,res){
    let body = "";
    req.on('data',(data)=>{
        body+=data;
    });
    
    req.on('end',()=>{
        let newRest = JSON.parse(body);
        for(let i=0;i<req.app.locals.restaurants.length;i++){
            if(req.app.locals.restaurants[i].id===parseInt(newRest.id)){
                req.app.locals.restaurants[i] = newRest;
                res.status(200);
                res.write("Restaurant saved");
            }
        }
        res.end();
    });
}
module.exports = router;