const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const User = require("../models/user");
const Farmer = require("../models/farmer");
const Enterprise = require("../models/enterprise");

const app = express();

mongoose.connect("mongodb://localhost/agriculture").then(()=>{
    console.log("Connection established!")
}).catch(()=>{
    console.log("Connection failed");
});

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();
});

app.post("/logIn", (req, res)=>{
    let data = req.body;
    User.find({username: data.username}).then((doc =>{
        if(doc.length == 0){
            res.json({
                message: 'No user',
                user: null
            })
        }
        else{
            if(!doc[0].approvedByAdmin){
                res.json({
                    message: 'User not approved',
                    user: null
                })
            }
            else{
                if(doc[0].password == data.password){
                    res.json({
                        message: 'Ok',
                        user: doc[0]
                    })
                }
                if(doc[0].password != data.password){
                    res.json({
                        message: 'Wrong password',
                        user: null
                    })
                }
            }
            
        }
    }))
});

app.post("/getUser", (req, res)=>{
    let username = req.body.username;
    let type = req.body.type;

    switch(type){
        case 0:
            User.find({username: username}).then(doc=>{
                user = doc[0];
                res.json({
                    user: user
                })
            });
            break;
        case 1:
            Enterprise.find({username: username}).then(doc=>{
                user = doc[0];
                res.json({
                    user: user
                })
            });
            break;
        case 2:
            Farmer.find({username: username}).then(doc=>{
                user = doc[0];
            })
            res.json({
                user: user
            })
            break;
    }
  
})

app.get("/getAllUsers", (req, res)=>{
    console.log("getAllUsers");
    User.find().then(doc =>{
        res.json({
            users: doc
        })
    })
})

app.listen(4000, () => console.log(`Express server running on port 4000`));