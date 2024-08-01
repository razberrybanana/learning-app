const express = require('express');
const router = express.Router();
const { Survey } = require('../models');
const { Op } = require("sequelize");
const yup = require("yup");

router.post("/", async (req, res) => {
    let data = req.body;
    console.log(data);
    
    // Validate request body
    let validationSchema = yup.object({
        name_prog: yup.string().trim().min(1).max(50),
        schedule_timing: yup.string().trim().min(1).max(5).required(),
        participation: yup.string().trim().min(1).max(5).required(),
        effectiveness: yup.string().trim().min(1).max(5).required(),
        good_effective: yup.string().trim().min(8).max(500).required(),
        need_improvement: yup.string().trim().min(1).max(500).required(),
    });
    try {
        data = await validationSchema.validate(data,
            { abortEarly: false });
        let result = await Survey.create(data);
        console.log("there");
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
            { name_prog: { [Op.like]: `%${search}%` } },
            { participation: { [Op.like]: `%${search}%` } },
            { effectiveness: { [Op.like]: `%${search}%` } },
            { good_effective: { [Op.like]: `%${search}%` } },
            { need_improvement: { [Op.like]: `%${search}%` } },
        ];
    }
    // You can add condition for other columns here
    // e.g. condition.columnName = value;
    
    let list = await Survey.findAll({
        where: condition,
        order: [['createdAt', 'DESC']]
    });
    res.json(list);
});

router.get("/:id", async (req, res) => {
    let id = req.params.id;
    let survey = await Survey.findByPk(id);
    // Check id not found
    if (!survey) {
        res.sendStatus(404);
        return;
    }
    res.json(survey);
});

router.put("/:id", async (req, res) => {
    let id = req.params.id;
    // Check id not found
    let survey = await Survey.findByPk(id);
    if (!survey) {
        res.sendStatus(404);
        return;
    }
    
    let data = req.body;
    // Validate request body
    let validationSchema = yup.object({
        name_prog: yup.string().trim().min(1).max(50),
        schedule_timing: yup.string().trim().min(1).max(5).required(),
        participation: yup.string().trim().min(1).max(5).required(),
        effectiveness: yup.string().trim().min(1).max(5).required(),
        good_effective: yup.string().trim().min(8).max(500).required(),
        need_improvement: yup.string().trim().min(1).max(500).required(),
    });
    try {
        data = await validationSchema.validate(data,
            { abortEarly: false });

        let num = await Survey.update(data, {
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
    let survey = await Survey.findByPk(id);
    if (!survey) {
        res.sendStatus(404);
        return;
    }

    let num = await Survey.destroy({
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