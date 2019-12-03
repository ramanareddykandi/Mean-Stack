const stocksModel = require('../model/stocks.model');
const userRegModel = require('../model/user.registration.model');
const userStocks = require('../model/user.stocks.model');
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const SECRET_KEY = "AA11bbCC";
let token = '';

let stocksControler = {}

stocksControler.login = async (req, res) => {
    let user = {id:req.body.userName}
    token = jwt.sign(user, SECRET_KEY);
    userRegModel.find({ $and: [{ userName: req.body.username },{password:req.body.password}] }, (err, result) => {
        if (err) {
            res.send({ "statusCode": 404, "msg":"Unauthorized !"})
        } else {
            res.send({"Token":token,"msg": "Successfully Logged In","statusCode":200});
        }
    })
}

stocksControler.registerUser = async (req, res) => {
    let user = new userRegModel({
        userName: req.body.userName,
        mobile: req.body.mobile,
        password:req.body.password
    })
   
    try {
        let userData = await user.save();
        if (userData && userData.err) throw userData.err;
        return res.send({ statusCode: 200, data: userData });
    } catch {
        res.send({ statusCode: 500, message: "Please try after some time.!" });
    }
}

stocksControler.dashboard =   (req, res) => {

    jwt.verify(token, SECRET_KEY, async (err, decoded)=> {
        if (err) {
            return res.send("You are unauthorized")
        }
        else {
            try {
                let stocksData = await stocksModel.find();
                console.log("Dashboard data:" + JSON.stringify(stocksData));
                if (stocksData && stocksData.err) throw stocksData.err;
                return res.send({ statusCode: 200, data: stocksData });
            } catch {
                res.send({ statusCode: 500, message: "Please try after some time.!" });
            }  
        }
    });
}
stocksControler.buyStock = async (req, res) => {
    jwt.verify(token, SECRET_KEY, async (err, decoded) => { 
        if (err) {
            res.send("You are Unauthorized")
        } else {
            let userStockModel = new userStocks({
                userName: req.body.userName,
                title: req.body.title,
                price:req.body.price
            })
           
            try {
                let userStockData = await userStockModel.save();
                if (userStockData && userStockData.err) throw userStockData.err;
                return res.send({ statusCode: 200, data: userStockData });
            } catch {
                res.send({ statusCode: 500, message: "Please try after some time.!" });
            }
        }
    }) 
}
stocksControler.sellStock =  (req, res) => {
    jwt.verify(token, SECRET_KEY, async(err, decoded) =>{
        if (err) {
            return res.send("You are unauthorized")
        } else {
            
    try {
        // let id =   new mongoose.mongo.ObjectId(req.body.id);
        let userStockData = await userStocks.remove({ _id: req.body.id });
        console.log( userStockData.err)
           if (userStockData && userStockData.err) throw userStockData.err;
           return res.send({ statusCode: 200, data: userStockData });
       } catch (err) {
           console.log(err)
           res.send({ statusCode: 500, message: "Please try after some time.!" });
         }
        }
    });
  
}

stocksControler.getUserStocks =  (req, res) => {
    jwt.verify(token, SECRET_KEY, async(err, decoded) =>{
        if (err) {
            return res.send("You are unauthorized")
        } else {
            try {
        
                console.log("Username:::" + req.query.userName)
                let userStockData = await userStocks.find({ userName: req.query.userName });
                console.log(userStockData.err)
                
                if (userStockData && userStockData.err) throw userStockData.err;
                return res.send({ statusCode: 200, data: userStockData });
            } catch (err) {
                console.log(err)
                return res.send({ statusCode: 500, message: "Please try after some time.!" });
            }
        }
    });
};




module.exports = stocksControler
