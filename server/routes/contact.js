const express = require('express');
const router = express.Router();
const { Contact } = require('../models');
const { Op } = require("sequelize");
const yup = require("yup");

router.post("/", async (req, res) => {
    let data = req.body;
    // Validate request body
    let validationSchema = yup.object({
        name: yup.string().trim().min(3).max(100).required(),
        salutation: yup.string().trim().min(2).max(3).required(),
        email: yup.string().trim().min(1).max(100).required(),
        phone_no: yup.string().min(8).max(15).required(),
        reason: yup.string().trim().min(1).max(100).required(),
        detail: yup.string().trim().min(1).max(500).required()
    });
    try {
        data = await validationSchema.validate(data,
            { abortEarly: false });
        let result = await Contact.create(data);
        res.json(result);
    }
    catch (err) {
        res.status(400).json({ errors: err.errors });
    }
});

router.get("/", async (req, res) => {
    let condition = {};
    let search = req.query.search;
    if (search) {
        condition[Op.or] = [
            { name: { [Op.like]: `%${search}%` } },
            { salutation: { [Op.like]: `%${search}%` } },
            { email: { [Op.like]: `%${search}%` } },
            { phone_no: { [Op.like]: `%${search}%` } },
            { reason: { [Op.like]: `%${search}%` } },
            { detail: { [Op.like]: `%${search}%` } }
        ];
    }
    // You can add condition for other columns here
    // e.g. condition.columnName = value;
    
    let list = await Contact.findAll({
        where: condition,
        order: [['createdAt', 'DESC']]
    });
    res.json(list);
});

router.get("/:id", async (req, res) => {
    let id = req.params.id;
    let contact = await Contact.findByPk(id);
    // Check id not found
    if (!contact) {
        res.sendStatus(404);
        return;
    }
    res.json(contact);
});

router.put("/:id", async (req, res) => {
    let id = req.params.id;
    // Check id not found
    let contact = await Contact.findByPk(id);
    if (!contact) {
        res.sendStatus(404);
        return;
    }
    
    let data = req.body;
    // Validate request body
    let validationSchema = yup.object({
        name: yup.string().trim().min(3).max(100).required(),
        salutation: yup.string().trim().min(2).max(3).required(),
        email: yup.string().trim().min(1).max(100).required(),
        phone_no: yup.string().trim().min(8).max(15).required(),
        reason: yup.string().trim().min(10).max(100).required(),
        detail: yup.string().trim().min(10).max(500).required()
    });
    try {
        data = await validationSchema.validate(data,
            { abortEarly: false });

        let num = await Contact.update(data, {
            where: { id: id }
        });
        if (num == 1) {
            res.json({
                message: "Request was updated successfully."
            });
        }
        else {
            res.status(400).json({
                message: `Cannot update request with id ${id}.`
            });
        }
    }
    catch (err) {
        res.status(400).json({ errors: err.errors });
    }
});

router.delete("/:id", async (req, res) => {
    let id = req.params.id;
    // Check id not found
    let contact = await Contact.findByPk(id);
    if (!contact) {
        res.sendStatus(404);
        return;
    }

    let num = await Contact.destroy({
        where: { id: id }
    })
    if (num == 1) {
        res.json({
            message: "Request was deleted successfully."
        });
    }
    else {
        res.status(400).json({
            message: `Cannot delete request with id ${id}.`
        });
    }
});

module.exports = router;