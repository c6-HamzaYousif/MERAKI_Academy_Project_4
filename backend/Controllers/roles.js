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

const updateRole = (req, res) => {
    const selectedRole = req.params.id;
    const {type, permissions} = req.body;
    rolesModel.findOneAndUpdate({_id: selectedRole}, {type, permissions}, {new:true})
    .then((result) => {
        const successObj = {
            success: true,
            newRole: {type, permissions}
        }
        res.status(201).json(successObj)
    })
    .catch((err) => {
        res.status(500).json(err.message)
    })
}

module.exports = {addRole, updateRole};