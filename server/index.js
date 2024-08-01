const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());



// Enable CORS
app.use(cors({
    origin: process.env.CLIENT_URL // Adjust to match your frontend URL
}));

app.get("/", (req, res) => {
    res.send("Welcome to the learning space");
});

// Routes setup (example)
const contactRoute = require('./routes/contact');
app.use("/contact", contactRoute);
const userRoute = require('./routes/user');
app.use("/user", userRoute);
const suggestionRoute = require('./routes/suggestion');
app.use("/suggestion", suggestionRoute);
const surveyRoute = require('./routes/survey');
app.use("/survey", surveyRoute);

// Database synchronization (example)
const db = require('./models');
db.sequelize.sync({ alter: true })
    .then(() => {
        let port = process.env.APP_PORT; // Default to 3001 if APP_PORT is not specified
        app.listen(port, () => {
            console.log(`⚡ Server running on http://localhost:${port}`);
        });
    })
    .catch((err) => {
        console.error('Unable to start server:', err);
    });
