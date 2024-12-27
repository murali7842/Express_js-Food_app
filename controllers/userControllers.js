const UserModel = require("../models/UserModel")
const bcrypt = require('bcryptjs');


exports.getUserController = async (req, res) => {
    try {
        const user = await UserModel.findById({ _id: req.body.id })
        if (!user) {
            return res.status(400).send({
                success: false,
                message: "user is not found",

            })
        }
        user.password = undefined;
        res.status(200).send({
            success: true,
            message: "user get successfully",
            user
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'users are not found',

        })

    }
}

exports.UpdateUserDetails = async (req, res) => {
    try {
        const user = await UserModel.findById({ _id: req.body.id })
        if (!user) {
            return res.status(400).send({
                success: false,
                message: "user is not found",
            })
        }
        const { userName, address, phone } = req.body
        if (userName) user.userName = userName;
        if (address) user.address = address;
        if (phone) user.phone = phone;

        await user.save();
        res.status(200).send({
            success: true,
            message: "User updated successfully",

        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error in update user API"
        })
    }
}

exports.resetPasswordController = async (req, res) => {
    try {
        const { email, newPassword, answer } = req.body
        if (!email || !newPassword || !answer) {
            return res.status(500).send({
                success: false,
                message: "please provide all fields"
            })
        }
        const user = await UserModel.findOne({ email, answer })
        if (!user) {
            return res.status(500).send({
                success: false,
                message: "user is not found and invalid user"
            })
        }
        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt)
        user.password = hashedPassword;
        await user.save();
        res.status(200).send({
            success: true,
            message: "reset password success"
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error is reset password API",
            error
        })
    }
}

exports.updatePasswordController = async (req, res) => {

    try {
        const user = await UserModel.findById({ _id: req.body.id })
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "user not found"
            })
        }
        const { oldPassword, newPassword } = req.body
        if (!oldPassword || !newPassword) {
           return res.status(500).send({
                success: false,
                message: "password is not found"
            })
        }
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
          return  res.status(500).send({
                sucess: false,
                message: "Invalid old password"
            })
        }
        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt)
        user.password = hashedPassword;
        await user.save();
        res.status(200).send({
            success: true,
            message: "new password updated"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "update password api Error",
            error
        })
    }

}

exports.deleteUserCotroller=async(req,res)=>{
  try {
    await UserModel.findByIdAndDelete(req.params.id)
    return res.status(200).send({
        success:true,
        message:"user deleted sucessfully"
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        message:"Error in delete user Api"
    })
    
  }
}
