const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./routes/auth');

const connectDB = async () => {
    try{
        await mongoose.connect(`mongodb+srv://learnmerndb:Jnby86GCIaxlFZgv@mern-learnit.kcbst.mongodb.net/mern-learnit?retryWrites=true&w=majority`, {
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
const PORT = 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

app.use('/api/auth' , authRouter);

