const express = require('express');
const usersModel = require('../models/users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const register = (req, res) => {
    const {firstName, lastName, email, password, age, city, gender, image, role="6330aca8842611c737b59c50"} = req.body;
    const userInstance = new usersModel({firstName, lastName, email, password, age, city, gender, image, role})
    .save()
    .then((result) => {
        const successObject = {
            message: "Registered successfully",
            success: true,
            result: result
        }
        res.status(201).json(successObject)
    })
    .catch((err) => {
        if(!email){
            res.status(500).json("Email field is required")
        }
        else if(!password){
            res.status(500).json("Password field is required")
        }
        else if(!firstName){
            res.status(500).json("First Name field is required")
        }else{
            res.status(500).json(err.message)
        }
    })
}

const getAllUsers = (req, res) => {
    usersModel.find({})
    .populate("role")
    .exec()
    .then((result) => {
        res.status(200).json(result)
    })
    .catch((err) => {
        res.status(404).json(err.message)
    })
}

const login = (req, res) => {
    const {email, password} = req.body;
    usersModel.find({email: email})
    .populate("role")
    .exec()
    .then((result) => {
        bcrypt.compare(password, result[0].password)
        .then((check) => {
            if(!check){
                res.status(404).json("Wrong password")
            }else{
                const payload = {
                    role: result[0].role.type,
                    permissions: result[0].role.permissions
                }
                const secret = "HushhhhhhhhhhThisIsASecret"
                const options = {
                    expiresIn: "1h"
                }
                const token = jwt.sign(payload, secret, options)
                const successObject = {
                    message: "Logged in successfully",
                    success: true,
                    token: token,
                    result: result
                }
                res.status(200).json(successObject)
            }
        })
    })
    .catch((err) => {
        res.status(404).json("Email not found")
    })
}

const editProfile = (req, res) => {
    const selectedProfile = req.params.id;
    const {firstName, lastName, email, password, age, city, gender, image, role="6330aca8842611c737b59c50"} = req.body;
    usersModel.findOneAndUpdate({_id: selectedProfile}, {firstName, lastName, email, password, age, city, gender, image, role}, {new:true})
    .then((result) => {
        console.log(result);
        const successObject = {
            message: "Changes Have Been Saved Successfully",
            success: true,
            result: result
        }
        res.status(200).json(successObject)
    })
    .catch((err) => {
        res.status(400).json(err.message);
    })
}


module.exports = {register, getAllUsers, login, editProfile};