import * as express from 'express';
import * as mongodb from 'mongodb';
import { collections } from './database';

export const studentRouter = express.Router();

studentRouter.use(express.json());

studentRouter.get('/', async (_req, res) => {
    try {
        const students = await collections.students.find({}).toArray();
        res.status(200).send(students);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

studentRouter.get('/:id', async (_req, res) => {
    try {
        const id = _req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id)};
        const student = await collections.students.findOne(query);
        if (student) {
            res.status(200).send(student)
        } else {
            res.status(404).send(`Failed to find a student with ID: ${id}`);
        }
    } catch (error) {
        res.status(404).send(`Failed to find a student with ID: ${_req?.params?.id}`);
    }
});

studentRouter.post('/', async (_req, res) => {
    try {
        const student = _req.body;
        const result = await collections.students.insertOne(student);

        if (result.acknowledged) {
            res.status(201).send(`Created new student entry with ID: ${result.insertedId}`)
        } else {
            res.status(500).send('Failed to create student entry');
        }
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});

studentRouter.put('/:id', async (_req, res) => {
    try {
        const id = _req?.params?.id;
        const student = _req.body;
        const query = { _id: new mongodb.ObjectId(id)};
        const result = await collections.students.updateOne(query, {$set: student});

        if (result && result.matchedCount) {
            res.status(200).send(`Student entry is updated for ID: ${id}`);
        } else if (!result.matchedCount) {
            res.status(404).send(`Failed to find student entry for ID: ${id}`);
        } else {
            res.status(304).send(`Failed to update student entry for ID: ${id}`);
        }
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});

studentRouter.delete('/:id', async (_req, res) => {
    try {
        const id = _req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id)};
        const result = await collections.students.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`Student ID:${id} successfully removed`);
        } else if (!result) {
            res.status(400).send((`Failed to remove Student ID:${id}.`));
        } else {
            res.status(404).send(`Student ID: ${id} not found`);
        }
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});