require('dotenv').config();
const express = require('express');

const routes = require('./routes/index');

const app = express();

const PORT = process.env.PORT ?? 3000;

// connect to routes in folder routes
app.use('/api', routes);

app.listen(PORT, () => console.log(`Server is Runing ${PORT}`));
