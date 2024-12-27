const express = require('express')
const bcrypt = require('bcryptjs');
const RestaruntModel = require('../models/RestaruntModel')


exports.createRestaruntController = async (req, res) => {
    try {
        const { title, imageUrl, food, time, pickup, delivery, isOpen, logoUrl, rating, ratingCount, code, coords } = req.body;
        if (!title || !coords) {
            return res.status(500).send({
                sucess: false,
                message: 'please title and coords fields'
            })
        }
        const newRestarunt = new RestaruntModel({
            title, imageUrl, food, time, pickup, delivery,
            isOpen, logoUrl, rating, ratingCount, code, coords
        })
        await newRestarunt.save();
        res.status(200).send({
            success: true,
            message: "Restarunt is created sucessfully"
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error in create restarunt api"
        })

    }
}


exports.getAllRestaruntsController = async (req, res) => {

    try {
        const restarunts = await RestaruntModel.find({})
        if (!restarunts) {
            return res.status(400).send({
                success: false,
                message: "user is not found",

            })
        }
        res.status(200).send({
            success: true,
            totalCount: restarunts.length,
            restarunts
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in getallrestarunts api"
        })
    }
}

exports.restaruntGetById = async (req, res) => {
    try {
        const getById = await RestaruntModel.findById(req.params.id);
        if (!getById) {
            return res.status(400).send({
                success: false,
                message: "Id is not found",

            })
        }
        res.status(200).send({
            success: true,
            message: "user is fetched successfully",
            getById
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in restaruntGetById api"
        })
    }
}

exports.delecteRestarunt = async (req, res) => {
    try {
        const deleteById = await RestaruntModel.findByIdAndDelete(req.params.id)

        if (!deleteById) {
            return res.status(400).send({
                success: false,
                message: "Id is not found",

            })
        }
        res.status(200).send({
            success: true,
            message: "user is deleted successfully",
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in restaruntGetById api"
        })
    }
}