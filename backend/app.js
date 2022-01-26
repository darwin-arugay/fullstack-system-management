// const path = require('path')

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const cors = require('cors');
app.use(cors({origin: 'http://localhost:3000'}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const usersRoutes = require('./routes/user');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(usersRoutes);

app.listen('8080', () => {
	console.log('Server started on port 8080')
})