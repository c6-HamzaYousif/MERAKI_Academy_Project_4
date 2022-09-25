const express = require('express');
const rolesModel = require('../models/roles');

const addRole = (req, res) => {
    const {type, permissions} = req.body;
    const roleInstance = new rolesModel({type, permissions})
    .save()
    .then((result) => {
        res.status(201).json("Added successfuly")
    })
    .catch((err) => {
        res.status(404).json(err.message)
    })
}

module.exports = {addRole};