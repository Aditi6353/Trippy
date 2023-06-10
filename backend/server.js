//express used for create api ,it's node library.
//passed json code.
//mongodb used for coonect with db.trigger qurey.
const cors = require("cors");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { MongoClient, ObjectId, Db } = require("mongodb");
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ limit: "20MB", extended: true }));
var urlencodedparser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.json({ limit: "20MB" }));
app.use(cors());
var url = "mongodb://localhost:10102";
var mainDb;
var DbO;

mongoose
  .connect(url + "/trippy", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((responce) => {
    console.log("Connected to MongoDB , ", responce.connection.name);
  })
  .catch((err) => console.log(err));
const placemodel = require("./models/place");
const loginmodel = require("./models/logininfo");



// MongoClient.connect(url, function (err, db) {
//   if (err) {console.log("error =:" ,err) };
//   mainDb = db;
//   DbO = mainDb.db("trippy");
//   console.log("connect function closed");
// });

//port for run server.js
//command for open server (type in terminal)= node server.js
const port_api = 10001;
app.listen(port_api, function () {
  console.log("Server-api listening at port %d", port_api);
});

app.post("/getplace", urlencodedparser, async (req, res) => {
  const name = req.body.name;
  const result = await placemodel.findOne({
    name: name
  });
  console.log(name);
  console.log("result is : ", result);
  res.send({ result: result });
});

app.post("/getplacebyid", urlencodedparser, async (req, res) => {
  const _id = req.body._id;
  const result = await placemodel.findOne({ _id: ObjectId(_id) });

  console.log(_id);
  console.log("result is : ", result);
  res.send({ placedata: result });
});

app.post("/getallplace", urlencodedparser, async (req, res) => {
  const response = await placemodel.find({ name: { $ne: "" } });
  res.send({ placedata: response });
  console.log("/getallplace result is :", response);

});

app.post("/insertdata", urlencodedparser, async (req, res) => {
  const data = req.body.data;
  console.log(data);
  try {
    const newUser = new placemodel({
      name: data.name,
      description: data.description,
      route: data.route,
      package: data.package,
      image: data.image,
    });
    const user = await newUser.save()
    console.log("insert result is : ", user);
    res.send({ status: 1 });
  } catch (e) {
    console.log(e);
    res.send({ status: 0 });
  }
  // console.log("result is : ", result);
  // res.send({ placedata: result});

});

app.post("/updatedata", urlencodedparser, async (req, res) => {
  const data = req.body.data;
  console.log(data);
  try {
    const _id = data._id;
    const name = data.name;
    const description = data.description;
    const route = data.route;
    const package = data.package;
    const image = data.image;
    const user = await placemodel.updateOne({ _id }, { $set: { name, description, route, package, image } }, { upsert: true })
    console.log("update result is : ", user.modifiedCount);
    res.send({ status: 1 });
  } catch (e) {
    console.log(e);
    res.send({ status: 0 });
  }

});

app.post("/deletedata", urlencodedparser, async (req, res) => {
  const data = req.body.data;
  console.log(data);
  try {
    const _id = data._id;
    const user = await placemodel.deleteOne({ _id :ObjectId(_id)});
    console.log("delete result is : ", user.deletedCount);
    if (user.deletedCount > 0) {
      res.send({ status: 1 });
    }
    else { res.send({ status: 0 }) }
  } catch (e) {
    console.log(e);
    res.send({ status: 0 });
  }

});
app.post("/uli", urlencodedparser, async (req, res) => {
  const data = req.body.user;
  console.log("/ulistart");
  console.log(data);
  try {
    const time=data.time;
    const name=data.firstName;
    const email = data.email;
    const user = await loginmodel.updateOne({ email},{$set:{name,time}},{upsert:true});
    res.send({ status: 1 }) 

  } catch (e) {
    console.log(e);
    res.send({ status: 0 });
  }

});

app.post("/guli", urlencodedparser, async (req, res) => {
  console.log("/gulistart");
  try {
    const user = await loginmodel.find({ email: { $ne: "" }});
    res.send({ status: 1 ,data:user}) ;
  } catch (e) {
    console.log(e);
    res.send({ status: 0 });
  }

});
// ssh -i .\mumbai_ubuntu-21123.pem -N -f -L 10102:localhost:27017 ubuntu@ec2-13-234-177-94.ap-south-1.compute.amazonaws.com