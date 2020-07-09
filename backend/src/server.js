const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const {Client, Status} = require("@googlemaps/google-maps-services-js");

const User = require("../models/user");
const Farmer = require("../models/farmer");
const Enterprise = require("../models/enterprise");
const Garden = require("../models/garden");
const Seed = require("../models/seed");
const ArticlInStorage = require("../models/articlInStorage");
const Articl = require("../models/articl");
const Order = require("../models/order");
const { json } = require("express");
const seed = require("../models/seed");

const app = express();

mongoose.set('useFindAndModify', false);

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
    console.log(data);
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
    console.log(username);
    console.log(type);
    switch(type){
        case 0:
            User.find({username: username}).then(doc=>{
                let user = doc[0];
                res.json({
                    user: user
                });
            });
            break;
        case 1:
            Enterprise.find({username: username}).then(doc=>{
                let user = doc[0];
                res.json({
                    user: user
                });
            });
            break;
        case 2:
            Farmer.find({username: username}).then(doc=>{
               let user = doc[0];
               res.json({
                   user: user
               });
            })
            break;
    }
  
});

app.post("/getUsername", (req, res)=>{
  let username = req.body.username;
 
  User.find({username: username}).then(doc=>{
      let user = doc[0];
      res.json({
          user: user
      });
  });
    
});

app.get("/getAllUsers", (req, res)=>{
    User.find().then(doc =>{
        res.json({
            users: doc
        })
    })
});

app.post("/getGardensByOwner", (req, res)=>{
    let owner = req.body.owner;
    console.log(owner);
    Garden.find({owner: owner}).then(doc =>{
        res.json({
            gardens: doc
        })
    })
});

app.post("/deleteUser", (req, res)=>{
    let username = req.body.username;
    User.deleteOne({username: username}, (err)=>{
        if(err) console.log(err);
    });
});

app.post("/approveUser", (req, res)=>{
    let username = req.body.username;

    User.update({username: username}, {approvedByAdmin: true}).then(doc=>{
        console.log(doc);
    })
});

app.post("/addNewUser", (req, res)=>{
    let user = req.body.user;
    let msg = "";

    User.find({username: user.username}).then(doc=>{
        if(doc.length == 0){
            const newUser = User.create(user);
            msg = "Ok";
        }
        else{
            msg = "Not ok"
        }

        res.json({
            message: msg
        });
    });
 
});

app.post("/addNewFarmer", (req, res)=>{
    let farmer = req.body.user;
    Farmer.create(farmer).then(data=>{
      res.json({
        msg: 'Ok'
      })
    });
});

app.post("/addNewEnterprise", (req, res)=>{
    let enterprise = req.body.user;
    Enterprise.create(enterprise).then(data=>{
      res.json({
        msg: 'Ok'
      })
    });
});

app.post("/updateEnterprise", (req, res)=>{
    console.log("EditEnteprise");
    let username = req.body.username;
    let enterprise = req.body.enterprise;

    Enterprise.findOneAndUpdate({username: username}, {
        companyName: enterprise.companyName, 
        email: enterprise.email,  
        dateOfCreation: enterprise.dateOfCreation,
        address: enterprise.address, 
        email:  enterprise.email}, (err)=>{
            if(err == null){
                res.json({
                    message: 'Ok'
                });
            }
            else{
                res.json({
                    message: 'Not ok'
                });
            }
    });
});

app.post("/updateFarmer", (req, res)=>{
    let username = req.body.username;
    let farmer = req.body.farmer;
    Farmer.findOneAndUpdate({username: username}, {
      name: farmer.name,
      surname: farmer.surname,
      dateOfBirth: farmer.dateOfBirth,
      placeOfBirth: farmer.placeOfBirth,
      phone: farmer.phone,
      email: farmer.email}, (err)=>{
            if(err == null){
                res.json({
                    message: 'Ok'
                });
            }
            else{
                res.json({
                    message: 'Not ok'
                });
            }
    });
});

app.post("/incWaterInGarden", (req, res)=>{
    let gardenName = req.body.garden;
    console.log(gardenName);
    Garden.findOneAndUpdate({ _id: gardenName},{$inc:{water: 1}}).then(data=>{

    });
});

app.post("/decWaterInGarden", (req, res)=>{
    let gardenName = req.body.garden;
    console.log(gardenName);
    Garden.findOneAndUpdate({ _id: gardenName},{$inc:{water: -1}}).then(data=>{

  });
});

app.post("/incTmpInGarden", (req, res)=>{
    let gardenName = req.body.garden;
    Garden.findOneAndUpdate({ _id: gardenName},{$inc:{temperature: 1}}).then(data=>{

    });
});

app.post("/decTmpInGarden", (req, res)=>{
    let gardenName = req.body.garden;
    console.log(gardenName);
    Garden.findOneAndUpdate({ _id: gardenName},{$inc:{temperature: -1}}).then(data=>{

    });
});

app.post("/getAllSeeds", (req, res)=>{
    let gardenName = req.body.garden;
    Seed.find({gardenId: gardenName}).then(doc=>{
        res.json({
            seeds: doc
        });
    });
});

app.post("/getGarden", (req, res)=>{
    let gardenName = req.body.garden;
    
    Garden.find({_id: gardenName}).then(doc=>{
        res.json({
            garden: doc[0]
        })
    });
});

app.post("/getAllGardensSeeds", (req, res)=>{
    let gardenName = req.body.garden;
    
    Seed.find({gardenId: gardenName}).then(doc=>{
        res.json({
            seeds: doc
        })
    });
});

app.post("/deleteSeedFromGarden", (req, res)=>{
  let id = req.body.id;
  let o = mongoose.Types.ObjectId(id);
  Seed.findByIdAndDelete(o).then(doc=>{
  });
});

app.post("/getStorageArticles", (req, res)=>{
  let gardenId = req.body.gardenId;
  let o = mongoose.Types.ObjectId(gardenId);
  ArticlInStorage.find({gardenId: o}).then(data=>{
    res.json({
      articls: data
    });
  })
});

app.get("/getAllArticls", (req, res)=>{
    Articl.find().then(data=>{
        res.json({
            articls: data
        })
    });
});

app.post("/createOrder", (req, res)=>{
  let toPut = req.body.order;
  Order.create(toPut).then(doc=>{
      res.json({
          msg: "Ok"
      });
  })
});

app.post("/getOrdersFromGarden", (req, res)=>{
  let garden = req.body.gardenId;

  Order.find({gardenId: garden, status: 1}).then(doc=>{
    res.json({
      orders: doc
    })
  })
});

app.post("/getArticlById", (req, res)=>{
  let id = req.body.articlId;
  Articl.findById(id).then(doc=>{
    res.json({
      articl: doc
    })
  })
});

app.post("/cancelOrder", (req, res)=>{
  let id = req.body.orderId;
  let o = mongoose.Types.ObjectId(id);

  Order.findByIdAndDelete(o,(err)=>{
    console.log(err);
  });
});

app.post("/getEnterpriseById", (req, res)=>{
  let id = req.body.id;
  Enterprise.findById(id).then(doc=>{
    res.json({
      enterprise: doc
    });
  })
});

app.get("/allOrders", (req, res)=>{
  Order.find().then(doc=>{
    res.json({
      orders: doc
    });
  });
});

app.post("/getOrdersFromEnterprise", (req, res)=>{
  let enterpriseId = req.body.enterpriseId;
  let e = mongoose.Types.ObjectId(enterpriseId);

  Order.find({enterpriseId: enterpriseId}).then(orders=>{
   res.json({
       orders: orders
   });
  });
});

app.post("/getArticlsFromEnterprise", (req, res)=>{
    let enterpriseId = req.body.enterpriseId;
    let e = mongoose.Types.ObjectId(enterpriseId);
    console.log(e);
    Articl.find({enterpriseId: enterpriseId}).then(a=>{
        console.log(a);
        res.json({
            articls: a
        });
    });
});

app.post("/addNewArticl", (req, res)=>{
    let articl = req.body.articl;
   
    console.log(articl);
    Articl.create(articl).then(a=>{
        console.log(a);
        if(a!=null)
            res.json({
                msg: 'Ok'
            })
        else
            res.json({
                msg: 'Not ok'
            })
    });
});

app.post("/getAPostman", (req, res)=>{
    let id = req.body.id;
    let e = mongoose.Types.ObjectId(id);
    Enterprise.findOneAndUpdate({_id: e}, {$inc:{availablePostman: -1}}).then(data=>{
      res.json({
        msg: 'Ok'
      })
    });
});

app.post("/returnAPostman", (req, res)=>{
    let id = req.body.id;
    let e = mongoose.Types.ObjectId(id);

    Enterprise.findOneAndUpdate({_id: e} ,{ $inc:{availablePostman: 1}}).then(data=>{
      res.json({
        msg: 'Ok'
      })
    })
});

app.post("/updateOrderStatus", (req, res)=>{
    let id = req.body.orderId;
    let status = req.body.status;
    let e = mongoose.Types.ObjectId(id);

    Order.findOneAndUpdate({_id: e} ,{ status: status}).then(data=>{
      console.log(data);
      // if(status == 4){
      //   for(let i = 0; i < data.articlIds.length; i++){
      //       let a = {
      //         _id: null,
      //         gardenId: data.gardenId,
      //         qnt: 1,
      //         articlId: data.articlIds[i] 
      //       }
      //       const aa = ArticlInStorage.create(a);
      //   }
      // }
    })
});

app.post("/removeArticl", (req, res)=>{
    let id = req.body.id;
    let e = mongoose.Types.ObjectId(id);
    Articl.findOneAndUpdate({_id: e} ,{ available: false}).then(data=>{

    })
});

app.post("/orderFromDay", (req, res)=>{
    let fromToday = req.body.fromToday;
    let today = new Date();
    let to, from;
    if(fromToday > 0){
        to = new Date(today-24*60*60*1000*(fromToday-1));
        to.setUTCHours(0 , 0, 0, 0);
        from = new Date(today -24*60*60*1000*fromToday);
        from.setUTCHours(0 , 0, 0, 0);
    }
    else{
        to = new Date();
        from = new Date(today -24*60*60*1000*fromToday);
        from.setUTCHours(0 , 0, 0, 0);
    }
    Order.find({$and: [ {dateOfOrder: {$gte: from}},{dateOfOrder: {$lte: to}}] }).then(doc=>{
        res.json({
          orders: doc,
          date: from
        });
    })

});

app.post("/changePassword", (req, res)=>{
  let username = req.body.username;
  let oldPassInput = req.body.oldPass;
  let newPass = req.body.newPass;
  
  User.findOneAndUpdate({username: username}, {password: newPass}).then(data=>{
    res.json({
      msg: 'Ok'
    })
  });
    
});

app.post("/checkPassword", (req, res)=>{
  let username = req.body.username;
  let pass = req.body.pass;
  
  User.find({username: username, password: pass}).then(data=>{
    if(data.length == 0){
      res.json({
        msg: 'Not ok'
      })
    }
    else{
      res.json({
        msg: 'Ok'
      })
    }
  });
    
});

app.get("/updateGardens", (req, res)=>{
  console.log("updateGardens")
  Garden.updateMany({$inc:{water: -1}, $inc: {temperature: -0.5}}).then(data=>{
    console.log(data);
    res.json({
      msg: 'Ok'
    })
  });
});

app.post("/getSeedFromStorage", (req, res)=>{
  console.log("getSeedFromStorage");
  let id = req.body.articlId;
  let e = mongoose.Types.ObjectId(id);
  console.log(id);
  ArticlInStorage.findOneAndUpdate({_id: e }, {$inc:{qnt: -1}}).then(data=>{
    console.log(data.qnt);
    if(data.qnt <= 0){
      ArticlInStorage.deleteOne({_id: e }).then(()=>{});
    }
    res.json({
      msg: 'Ok'
    })
  });
});

app.post("/plantASeed", (req, res)=>{
    let id = req.body.gardenId;
    let e = mongoose.Types.ObjectId(id);

    Garden.findOneAndUpdate({ _id: req.body.s.gardenId, numOfUsedSeeds: {$gte: 1}}, {$inc: {numOfUsedSeeds: 1}}).then(data=>{
      Seed.create(req.body.s).then(data=>{
        res.json({
          msg: 'Ok'
        })
      });
    });
});

app.get("/updateProgress", (req, res)=>{
  console.log("updateProgress");
  
  Seed.find().stream().on('data', (d)=>{
    let total = d.totalGrowDays;
    Seed.findOneAndUpdate({_id: d._id, progress:{$lt: total}},{$inc: {progress: 1}}).then(data=>{
      console.log(data);
    })
  }).on('error', function(err){
    console.log(err);
  })
  .on('end', function(){
    // final callback
  });

});

app.post("/getSeedById", (req, res)=>{
  let id = req.body.id;
  console.log(id);
  let e = mongoose.Types.ObjectId(id);
  Seed.findById(e).then(data=>{
    res.json({
      seed: data
    })
  });
});

app.post("/setHarvested", (req, res)=>{
  let id = req.body.seed;
  let e = mongoose.Types.ObjectId(id);
  Seed.findOneAndUpdate({_id: e}, {harvested: true}).then(data=>{
    console.log(data);
    res.json({
      msg: 'ok'
    })
  });
});

app.post("/addArticlInStorage", (req, res)=>{
  let articl = req.body.articl;
  console.log("/addArticlInStorage");
  let e = mongoose.Types.ObjectId(articl.gardenId);
  let a = mongoose.Types.ObjectId(articl.articlId);
  // ArticlInStorage.findOneAndUpdate({gardenId: e, articlId: a}, {$inc:{qnt: 1}}, (err, doc)=>{
  //   console.log("Doc => ", doc);
  //   if(doc == null){
  //     // ArticlInStorage.create(articl);
  //   }
  //   res.json({
  //     msg: 'Ok'
  //   })
  //   console.log(doc);
  // })
  ArticlInStorage.findOneAndUpdate({gardenId: e, articlId: a}, {$inc:{qnt: 1}}).then(data=>{
    console.log("Data ->", data);
    if(data == null){

      ArticlInStorage.create(articl);
    }
    res.json({
      msg: 'Ok'
    })
  });
  
});

app.post("/getDistance",(req, res)=>{
  const client = new Client({});
  let a = req.body.a;
  let b =req.body.b;
  client
    .distancematrix({
      params: {
        origins: [a],
        destinations: [b],
        key: "AIzaSyDq1SIDuN-JWV0N_uIVv1gF_65oLMrpOXU",
      },
      timeout: 1000, // milliseconds
    })
    .then((r) => {
      console.log(r.data.rows[0].elements[0].duration);
      res.json({
        'time': r.data.rows[0].elements[0].duration
      })
    })
    .catch((e) => {
      console.log(e.response.data.error_message);
    });
});

app.get("/getAllGardens", (req, res)=>{
  Garden.find().then(doc=>{
    console.log(doc);
    res.json({
      gardens: doc
    })
  })
});

app.post("/addNewGarden", (req, res)=>{
  let garden = req.body.garden;

  Garden.create(garden).then(data=>{
    console.log(data);
    res.json({
      msg: 'Ok'
    })
  })
});

app.listen(4000, () => console.log(`Express server running on port 4000`));