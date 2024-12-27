const FoodModel = require("../models/FoodModel")
const OrderModel = require("../models/OrderModel")

exports.createFoodController = async (req, res) => {
    try {
        const { title, decription, price, imageURL, foodTags, category, code, isAvailable, restarunt, rating, ratingCount } = req.body

        if (!title || !decription || !price || !restarunt) {
            res.status(400).send({
                success: false,
                message: "title,decription,price fill the fields"
            })
        }
        const createFood = new FoodModel({
            title, decription, price, imageURL, foodTags,
            category, code, isAvailable, restarunt, rating, ratingCount
        })
        await createFood.save();
        res.status(200).send({
            success: true,
            message: "Food item is created",
            createFood
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error is create food api'
        })
    }
}

exports.getAllFoods = async (req, res) => {
    try {
        const getAllFoodsList = await FoodModel.find({})
        if (!getAllFoodsList) {
            return res.status(400).send({
                success: false,
                message: "no food items was found",

            })
        }
        res.status(200).send({
            success: true,
            totalCount: getAllFoodsList.length,
            getAllFoodsList
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error is create food api'
        })
    }
}

exports.getByIdFood = async (req, res) => {
    try {
        const FoodById = await FoodModel.findById(req.params.id)
        if (!FoodById) {
            return res.status(400).send({
                success: false,
                message: "id is not found",

            })
        }
        res.status(200).send({
            success: true,
            FoodById

        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error is create food api'
        })
    }
}


exports.getFoodRestaruntById = async (req, res) => {
    try {
        const RestaruntId = req.params.id
        if (!RestaruntId) {
            return res.status(404).send({
                success: false,
                message: "id is not found",

            })
        }
        const food = await FoodModel.find({ restarunt: RestaruntId })
        if (!food) {
            return res.status(404).send({
                success: false,
                message: "food is not found",

            })
        }

        res.status(200).send({
            success: true,
            message: "RestaruntById fetched Food items",
            food
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error is getByRestaruntId api'
        })
    }
}

exports.updateFoodController = async (req, res) => {
    try {
        const foodId = req.params.id
        if (!foodId) {
            return res.status(404).send({
                success: false,
                message: "Id is not found",

            })
        }
        const food = await FoodModel.findById(foodId)
        if (!food) {
            return res.status(404).send({
                success: false,
                message: "food is not found",

            })
        }
        const { title, decription, price, imageURL, foodTags, category,
            code, isAvailable, restarunt, rating, ratingCount } = req.body
        const updateFood = await FoodModel.findByIdAndUpdate(foodId, {
            title, decription, price, imageURL, foodTags, category,
            code, isAvailable, restarunt, rating, ratingCount
        }, { new: true })
        res.status(200).send({
            success: true,
            message: "food is updated successfully",
            food
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error is UpdateFood item api'
        })
    }
}

exports.deleteFoodController = async (req, res) => {
    try {
        const foodId = req.params.id
        if (!foodId) {
            return res.status(404).send({
                success: false,
                message: "Id is not found",

            })
        }
        const deleteFoodItem = await FoodModel.findByIdAndDelete(foodId)
        if (!deleteFoodItem) {
            return res.status(404).send({
                success: false,
                message: "foodItem is not found",

            })
        }
        res.status(200).send({
            success: true,
            message: "Food item was deleted succesfully"
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error is delete FoodItem api'
        })
    }
}
exports.plcaeOrderCnontroller = async (req, res) => {
    try {
        const { cart } = req.body;

        // Validate the cart
        if (!cart || !cart.length) {
            return res.status(400).send({
                success: false,
                message: "Cart is required and cannot be empty."
            });
        }

        // Extract ObjectId from the cart
        const foodIds = cart.map(item => item.id); // Assuming 'id' in cart is the ObjectId of Food

        // Calculate total payment
        const totalPayment = cart.reduce((total, item) => total + item.price, 0);

        // Create a new order
        const newOrder = new OrderModel({
            foods: foodIds,
            payment: totalPayment,
            buyer: req.body.id // Assuming buyer's ObjectId is sent in the request body
        });

        // Save the order
        await newOrder.save();

        res.status(201).send({
            success: true,
            message: "Order placed successfully.",
            newOrder
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error in place order API."
        });
    }
};


exports.oderStatusController = async (req, res) => {
    try {
        const orderId = req.params.id
        if (!orderId) {
            res.status(400).send({
                success: false,
                message: "oder id is not found"
            })
        }
        const { status } = req.body
        const order = await OrderModel.findByIdAndUpdate(orderId, { status }, { new: true })
        res.status(200).send({
            success: true,
            message: "Order status updated",
            order
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error is oder status api'
        })
    }
}