/*import express, { Router } from "express";
const router= express.Router();
import { Book } from './bookModel.js';



router.post('/books', async (req, res) => {
    try {
        // Validation and creation of new book
        // ... (your existing code)
        const newbook = {
            title: req.body.title,
            author: req.body.author,
            publishyear: req.body.publishyear,
        };
        const book = await Book.create(newbook);
        return res.status(201).send(book);
    } catch (error) {
        console.log('error message');
        return res.status(500).send({ message: error.message });
    }
});

router.get('/books', async (req, res) => {
    try {
        // Fetch all books
        const books = await Book.find({});
        return res.status(200).json({
            count: books.length,
            data: books
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ message: error.message });
    }
});

router.get('/books/:id', async (req, res) => {
    try {
        // Fetch a book by ID
        const { id } = req.params;
        const book = await Book.findById(id);
        return res.status(200).json(book);
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ message: error.message });
    }
});

router.put('/books/:id', async (req, res) => {
    try {
        // Update a book by ID
        const { id } = req.params;
        const result = await Book.findByIdAndUpdate(id, req.body);
        if (!result) {
            return res.status(404).send({ message: "Book not in the database" });
        }
        return res.status(200).send({ message: "Updated" });
    } catch (error) {
        console.log('error message');
        return res.status(500).send({ message: error.message });
    }
});


router.delete('/books/:id', async (req, res) => {
    try {
        // Update a book by ID
        const { id } = req.params;
        const result = await Book.findByIdAndUpdate(id);
        if (!result) {
            return res.status(404).send({ message: "Book not in the database" });
        }
        return res.status(200).send({ message: "book deleted suceesfully" });
    } catch (error) {
        console.log('error message');
        return res.status(500).send({ message: error.message });
    }
});

export default router;*/