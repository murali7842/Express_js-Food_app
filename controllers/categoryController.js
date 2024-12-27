const CategoryModel = require("../models/CategoryModel")

exports.createCategory = async (req, res) => {
    try {
        const { title, imageUrl } = req.body;
        if (!title) {
            return res.status(500).send({
                sucess: false,
                message: 'please provide title fields'
            })
        }
        const newCategory = new CategoryModel({
            title, imageUrl
        })
        await newCategory.save();
        res.status(200).send({
            success: true,
            message: "Category is created sucessfully",
            newCategory
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in create category api"
        })
    }
}

exports.getAllCategorys = async (req, res) => {
    try {
        const allcategorys = await CategoryModel.find({});
        if (!allcategorys) {
            return res.status(400).send({
                success: false,
                message: "categorys is not found",

            })
        }
        res.status(200).send({
            success: true,
            totalCount: allcategorys.length,
            allcategorys
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in getall category api"
        })
    }
}
exports.updateCategory = async (req, res) => {
    try {
        const {id}=req.params
        const {title,imageUrl} =req.body
        const updateCat=await CategoryModel.findByIdAndUpdate(id,{title,imageUrl},{new:true})
        if (!updateCat) {
            return res.status(400).send({
                success: false,
                message: " id is not found",

            })
        }
        res.status(200).send({
            success: true,
            message:"updated successfully",
            updateCat
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error in update  category api"
        })
    }
}
exports.deleteCategory = async (req, res) => {
    try {

        const categorydelete=await CategoryModel.findByIdAndDelete(req.params.id)
        if (!categorydelete) {
            return res.status(400).send({
                success: false,
                message: "id is not found",

            })
        }
        res.status(200).send({
            success: true,
            message:"Deleted Category Successfully",
           
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error in delete category api"
        })
    }
}