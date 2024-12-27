const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Category title is required"]
    },
    imageUrl: {
        type: String,
        default:"https://www.google.com/imgres?q=food%20icon%20png&imgurl=https%3A%2F%2Fpng.pngtree.com%2Felement_our%2Fpng%2F20180930%2Ffood-icon-design-vector-png_120564.jpg&imgrefurl=https%3A%2F%2Fpngtree.com%2Fso%2Ffood-icon&docid=clLz3_Zru6bNQM&tbnid=Rkh_VfF18KU5zM&vet=12ahUKEwjEz_67iZCKAxVETGwGHdsIM6oQM3oECBsQAA..i&w=360&h=360&hcb=2&ved=2ahUKEwjEz_67iZCKAxVETGwGHdsIM6oQM3oECBsQAA"
    },
  
    

},{timestamps:true})

module.exports=mongoose.model('Category',categorySchema)