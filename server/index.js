const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./routes/auth');
const postRouter = require('./routes/post');
require('dotenv').config();
const cors = require('cors');
const connectDB = async () => {
    try{
        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@mern-learnit.kcbst.mongodb.net/mern-learnit?retryWrites=true&w=majority`, {
            useCreateIndex : true,
            useNewUrlParser : true,
            useUnifiedTopology : true,
            useFindAndModify : false
        });
        console.log('mongodb connected !')
    }catch (e) {
        console.log(e.message);
        process.exit(1);
    }
};
connectDB();

const app = express();
app.use(express.json());
app.use(cors());
const PORT = 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

app.use('/api/auth' , authRouter);
app.use('/api/post' , postRouter);

