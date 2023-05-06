const mongoose=require('mongoose');

// - Author Name
// - Notice Title
// - Notice Description
// - Date (could generate from backend as well)

const NoticeSchema=mongoose.Schema({
    AuthorName:String,
    NoticeTitle:String,
    Description:String,
    uniquekey:String,
    Date:Date
})

const NoticeModel=mongoose.model("notice",NoticeSchema);

module.exports={
    NoticeModel
}