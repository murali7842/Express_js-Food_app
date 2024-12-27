const mongoose = require('mongoose')

const foodSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Food title is required"]
    },
    decription:{
        type:String,
        required:[true,"Decription is required"]
    },
    price:{
        type:Number,
        required:[true,"Price is required"]
    },
    imageURL:{
       type:String,
       default:"https://www.google.com/imgres?q=food%20icon%20png&imgurl=https%3A%2F%2Fpng.pngtree.com%2Felement_our%2Fpng%2F20180930%2Ffood-icon-design-vector-png_120564.jpg&imgrefurl=https%3A%2F%2Fpngtree.com%2Fso%2Ffood-icon&docid=clLz3_Zru6bNQM&tbnid=Rkh_VfF18KU5zM&vet=12ahUKEwjEz_67iZCKAxVETGwGHdsIM6oQM3oECBsQAA..i&w=360&h=360&hcb=2&ved=2ahUKEwjEz_67iZCKAxVETGwGHdsIM6oQM3oECBsQAA"
    },
    foodTags: {
        type: String,
    },
    category:{
        type:String,
    },
    code:{
        type:String
    },
    isAvailable:{
        type:Boolean,
        default:true
    },
    restarunt:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Restarunt"
    },
    rating:{
        type:Number,
        default:1,
        min:1,
        max:5
    },
    ratingCount:{
        type:String,

    },
    

},{timestamps:true})

module.exports=mongoose.model('Food',foodSchema)