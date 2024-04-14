 /*import express from "express";
    import { PORT, mongoDBURL } from "./config.js";
    import mongoose from 'mongoose';
    
    const app = express();
    
    app.get('/', (req, res) => {
        console.log(req);
        return res.status(234).send('Welcome to the MERN stack tutorial');
    });
 
app.post('/books',(req, res) => {
    try{
            if(
                !req.body.title ||
                !req.body.author ||
                !req.body.publishyear 
            )
            {

                return res.status(400).send({
                    meessage:'send all required fields:title,author,publishyear',
                });
            }
            const newbook={
                title: req.body.title,
                author: req.body.author,
                publishyear: req.body.publishyear,
            
            };
            const book = await Book.create(newbook);
            return res.status(201).send(book);

    }
    catch(error){
        console.log('error message');
        response.stautus(500).send({ messsage : error.message});
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
    */