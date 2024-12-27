const UserModel = require("../models/UserModel")

module.exports=async (req,res,next)=>{
    try {
        const user=await UserModel.findById(req.body.id)
        if(!user){
            res.status(401).send({
              success:false,
              message:'only access adimn'
            })
        }else{
            next();
        }
        } catch (error) {
        res.status(500).send({
            success:false,
            message:"un-Authorized access",
            error
        })
    }
}