const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const userRoutes = require('./routes/user');

//  Database Controller
require('./controllers/database/connection');

app.get('/', (req, res) => {
    res.json({
        serverStatus: "active",
        message: 'Successfully connected to API'
    });
})

/*   
/   User Routes
*/

app.use(userRoutes);


app.listen(PORT, () => {
    console.info('API Minhas Compras - Server started on port ' + PORT);
})