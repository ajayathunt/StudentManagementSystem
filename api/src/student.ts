import * as mongodb from 'mongodb';
export interface Student {
    name: string;
    house: 'red' | 'yellow' | 'blue' | 'green';
    grade: number;
    hobby: string;
    _id?: mongodb.ObjectId;
}