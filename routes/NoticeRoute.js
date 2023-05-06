const express = require("express");
const { NoticeModel } = require("../models/noticemodel");
const noticerouter = express.Router();

noticerouter.get("/", async (req, res) => {
  try {
    const data = await NoticeModel.find();
    console.log(data);
    res.json({ msg: "Successfully Got all the Notices", data: data });
  } catch (error) {
    console.log(error);
    res.json({ msg: "Error while fetching the Notices" });
  }
});

noticerouter.post("/create", async (req, res) => {
  const payload = req.body;

  try {
    let notice_data = new NoticeModel(payload); 
    // console.log(notice_data)
    await notice_data.save();
    res.json({ msg: "Successfully Posted the Notices" });
  } catch (error) {
    console.log(error);
    res.json({ msg: "Error while Posting the Notices" });
  }
});

noticerouter.patch("/edit/:key",async(req,res)=>{
  let key =req.params.key;
  // console.log(key)
  const payload=req.body;
  let id;
  let database_key;
  let databaseuserkey=await NoticeModel.find({"uniquekey":key});
  // console.log(databaseuserkey);
  if(databaseuserkey.length!=0){
    let database_id=databaseuserkey[0]._id;
     id=database_id.toString();
     database_key=databaseuserkey[0].uniquekey;
  }else{
   return res.json("unique key is not correct")
  }

  try {
    if(key==database_key){
     let store= await NoticeModel.findByIdAndUpdate({"_id":id},{new:true},payload);
      res.json({"msg":"Successfully Edited the data","data":store})
    }else{
     res.json("you are not authorized")
    }
  } catch (error) {
    console.log(error);
    res.json({ msg: "Error while Editing the Notices" }); 
  }
})


noticerouter.delete("/delete/:key",async(req,res)=>{
  let key =req.params.key;
  // console.log(key)

  let id;
  let database_key;
  let databaseuserkey=await NoticeModel.find({"uniquekey":key});
  // console.log(databaseuserkey);
  if(databaseuserkey.length!=0){
    let database_id=databaseuserkey[0]._id;
     id=database_id.toString();
     database_key=databaseuserkey[0].uniquekey;
  }else{
   return res.json("unique key is not correct")
  }

  try {
    if(key==database_key){
     let store= await NoticeModel.findByIdAndDelete({"_id":id},{new:true});
      res.json({"msg":"Successfully deleted the data","data":store})
    }else{
     res.json("you are not authorized")
    }
  } catch (error) {
    console.log(error);
    res.json({ msg: "Error while Deleting the Notices" }); 
  }
})

module.exports = {
  noticerouter, 
};
