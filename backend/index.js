import express from "express";
import cors from "cors"; // Import cors
import { PORT, mongoDBURL } from "./config.js";
import mongoose from 'mongoose';

const app = express();

app.use(express.json());
app.use(cors()); // Enable CORS for all routes

// Option 2: Allow Custom Origins
// app.use(
//   cors({
//      origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//      allowedHeaders: ['Content-Type'],
//    })
// );

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    publishYear: Number, // New field added for publish year
});

const Book = mongoose.model('Book', bookSchema);

app.get('/', (req, res) => {
    console.log(req);
    return res.status(234).send('Welcome to the MERN stack tutorial');
});

app.post('/books', async (req, res) => {
    try {
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishyear: req.body.publishyear,
        };

        const book = await Book.create(newBook);

        // Send back the book with the publishyear explicitly included
        return res.status(201).send({
            title: book.title,
            author: book.author,
            publishyear: book.publishyear,
            _id: book._id,
            __v: book.__v,
        });
    } catch (error) {
        console.log('Error:', error.message);
        return res.status(500).send({ message: error.message });
    }
});


app.get('/books', async (req, res) => {
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

app.get('/books/:id', async (req, res) => {
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

app.put('/books/:id', async (req, res) => {
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

app.delete('/books/:id', async (req, res) => {
    try {
        // Delete a book by ID
        const { id } = req.params;
        const result = await Book.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).send({ message: "Book not in the database" });
        }
        return res.status(200).send({ message: "Deleted" });
    } catch (error) {
        console.log('error message');
        return res.status(500).send({ message: error.message });
    }
});

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log("App connected to the database");
        app.listen(PORT, () => {
            console.log('App started');
        });
    })
    .catch((error) => {
        console.error("Error connecting to the database:", error);
    });
