import express, { Router } from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const router = express.Router();

//gets a list of all records.
router.get("/", async(req, res) => {
    let collection = await db.collection("records");
    let results = await collection.find({}).toArray();
    res.send(results).status(200);
})

//gets list of a single record id.
router.get("/:id", async(req, res) => {
    let collection = await db.collection("records");
    let query = { _id: new ObjectId(req.params.id) };
    let result = await collection.findOne(query);

    if(!result) res.send("Not found").status(404);
    else res.send(result).status(200);
});

//helps create a new record.
router.post("/", async (req, res) => {
    try{
        let newDocument = {
            name: req.body.name,
            position: req.body.position, 
            level: req.body.level,
        };
        
        let collection = await db.collection("records");
        let result = await collection.insertOne(newDocument);
        res.status(201).send(result);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error adding record");
    }
});

//helps update a record by id.
router.patch("/:id", async(req, res) => {
    try {
        const query = { _id: new ObjectId(req.params.id) };
        const updates = {
            $set: {
                name: req.body.name,
                position: req.body.position, // Corrected spelling
                level: req.body.level,
            },
        };

        let collection = await db.collection("records");
        let result = await collection.updateOne(query, updates);
        res.send(result).status(200);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error updating record");
    } 
});

//helps to delete a record.
router.delete("/:id", async(req, res) => {
    try {
        const query = { _id: new ObjectId(req.params.id) };
        const collection = db.collection("records");
        let result = await collection.deleteOne(query);

        res.send(result).status(200);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error deleting record");
    }
});

export default router;
