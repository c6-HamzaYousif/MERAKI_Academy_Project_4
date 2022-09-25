const express = require('express');
const usersModel = require('../models/users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const register = (req, res) => {
    const {firstName, lastName, email, password, age, city, image, role="632dcd8b819bf5883b5b029f"} = req.body;
    const userInstance = new usersModel({firstName, lastName, email, password, age, city, image, role})
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
        res.status(500).json(err.message)
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

module.exports = {register, getAllUsers};