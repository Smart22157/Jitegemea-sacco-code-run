import express, { Router } from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const router = express.Router();

// Gets a list of all invoices
router.get("/", async (req, res) => {
    let collection = await db.collection("invoices");
    let results = await collection.find({}).toArray();
    res.send(results).status(200);
});

// Gets a single invoice by ID
router.get("/:id", async (req, res) => {
    let collection = await db.collection("invoices");
    let query = { _id: new ObjectId(req.params.id) };
    let result = await collection.findOne(query);

    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
});

// Creates a new invoice
router.post("/", async (req, res) => {
    try {
        // Validate incoming data
        if (!req.body.amount || !req.body.date || !req.body.customerId) {
            return res.status(400).send("Missing required fields");
        }

        let newDocument = {
            amount: req.body.amount,
            date: req.body.date,
            customerId: req.body.customerId,
        };

        let collection = await db.collection("invoices");
        let result = await collection.insertOne(newDocument);
        res.status(201).send(result);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error adding invoice");
    }
});

// Updates an invoice by ID
router.patch("/:id", async (req, res) => {
    try {
        const query = { _id: new ObjectId(req.params.id) };
        const updates = {
            $set: {
                amount: req.body.amount,
                date: req.body.date,
                customerId: req.body.customerId,
            },
        };

        let collection = await db.collection("invoices");
        let result = await collection.updateOne(query, updates);
        res.send(result).status(200);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error updating invoice");
    }
});

// Deletes an invoice by ID
router.delete("/:id", async (req, res) => {
    try {
        const query = { _id: new ObjectId(req.params.id) };
        const collection = db.collection("invoices");
        let result = await collection.deleteOne(query);

        res.send(result).status(200);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error deleting invoice");
    }
});

export default router;
