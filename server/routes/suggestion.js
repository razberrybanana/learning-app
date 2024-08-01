const express = require('express');
const router = express.Router();
const { Suggestion } = require('../models');
const { Op } = require("sequelize");
const yup = require("yup");

// Validation schema for suggestion data
router.post("/", async (req, res) => {
    let data = req.body
    let validationSchema = yup.object({
        name: yup.string().trim().min(3).max(100).required(),
        salutation: yup.string().trim().min(2).max(3).required(),
        email: yup.string().trim().min(1).max(100).required(),
        phone_no: yup.string().min(8).max(15).required(),
        type_of_activity: yup.string().trim().min(1).max(100).required(),
        duration: yup.string().trim().min(1).max(50),
        detail: yup.string().trim().min(1).max(500).required(),
    });
    try {
        data = await validationSchema.validate(data,
            { abortEarly: false });
        let result = await Suggestion.create(data);
        res.json(result);
    }
    catch (err) {
        res.status(400).json({ errors: err.errors });
    }
});
// GET route to fetch all suggestions or filter by search query
router.get("/", async (req, res) => {
    let condition = {};
    let search = req.query.search;
    if (search) {
        condition[Op.or] = [
            { name: { [Op.like]: `%${search}%` } },
            { salutation: { [Op.like]: `%${search}%` } },
            { email: { [Op.like]: `%${search}%` } },
            { phone_no: { [Op.like]: `%${search}%` } },
            { type_of_activity: { [Op.like]: `%${search}%` } },
            { duration: { [Op.like]: `%${search}%` } },
            { detail: { [Op.like]: `%${search}%` } },
        ];
    }

    let list = await Suggestion.findAll({
        where: condition,
        order: [['createdAt', 'DESC']]
    });
    res.json(list);
});

// GET route to fetch a suggestion by ID
router.get("/:id", async (req, res) => {
    let id = req.params.id;
    let suggestion = await Suggestion.findByPk(id);
    if (!suggestion) {
        res.sendStatus(404); // Not Found
        return;
    }
    res.json(suggestion);
});

// PUT route to update a suggestion by ID
router.put("/:id", async (req, res) => {
    let id = req.params.id;
    let suggestion = await Suggestion.findByPk(id);
    if (!suggestion) {
        res.sendStatus(404); // Not Found
        return;
    }

    let data = req.body;
    let validationSchema = yup.object({
        name: yup.string().trim().min(3).max(100).required(),
        salutation: yup.string().trim().min(2).max(3).required(),
        email: yup.string().trim().min(1).max(100).required(),
        phone_no: yup.string().min(8).max(15).required(),
        type_of_activity: yup.string().trim().min(1).max(100).required(),
        duration: yup.string().trim().min(1).max(50),
        detail: yup.string().trim().min(1).max(500).required(),
    });
    try {
        data = await validationSchema.validate(data,
            { abortEarly: false });

        let num = await Suggestion.update(data, {
            where: { id: id }
        });
        if (num == 1) {
            res.json({
                message: "Suggestion updated successfully."
            });
        }
        else {
            res.status(400).json({
                message: `Cannot update suggestion with id ${id}.`
            });
        }
    }
    catch (err) {
        res.status(400).json({ errors: err.errors });
        console.log(err.errors)
    }
});

// DELETE route to delete a suggestion by ID
router.delete("/:id", async (req, res) => {
    let id = req.params.id;
    let suggestion = await Suggestion.findByPk(id);
    if (!suggestion) {
        res.sendStatus(404); // Not Found
        return;
    }

    let num = await Suggestion.destroy({
        where: { id: id }
    });
    if (num == 1) {
        res.json({
            message: "Suggestion deleted successfully."
        });
    } else {
        res.status(400).json({
            message: `Cannot delete suggestion with id ${id}.`
        });
    }

});

module.exports = router;
