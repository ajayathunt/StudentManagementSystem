import * as mongodb from 'mongodb';
import { Student } from './student';

export const collections: {
    students?: mongodb.Collection<Student>;
} = {};

export async function connectToDatabase(uri: string) {
    const client = new mongodb.MongoClient(uri);
    await client.connect();

    const db = client.db('studentManagementSystem');
    await applySchemaValidation(db);

    const studentsCollection = db.collection<Student>('students');
    collections.students = studentsCollection;

}

// Update our existing collection with JSON schema validation,
// so we know our documents will always match the shape of our Employee model,
// even if added elsewhere.
async function applySchemaValidation(db: mongodb.Db) {
    const studentSchema = {
        $studenSchema: {
            bsonType: 'object',
            required: ['name', 'house', 'grade'],
            additionalProperties: false,
            properties: {
                _id: {},
                name: {
                    bsonType: 'string',
                    description: '"name" is required and is a string',
                },
                grade: {
                    bsonType: 'number',
                    description: '"grade" is required and is a number',
                },
                hobby: {
                    bsonType: 'string',
                    description: '"hobby" is required and is string',
                    minLenght: 5,
                },
                house: {
                    bsonType: 'string',
                    description: '"house" is required and is one of "red", "green", "yellow", or "blue"',
                    enum: ['red', 'yellow', 'blue', 'green'],
                }

            }
        }
    }

    // Apply modification to collection, create in not available
    await db.command({
        collMod: 'students',
        validation: studentSchema
    }).catch(async (error: mongodb.MongoServerError) => {
        if (error.codeName === 'NamespaceNotFound') {
            await db.createCollection('students', {validator: studentSchema});
        }
    });

}