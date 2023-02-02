const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors')

require('dotenv/config');
const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler');

const api = process.env.API_URL;
const productsRouter = require('./routers/products');
const ordersRouter = require('./routers/orders');
const usersRouter = require('./routers/users');
const categoriesRouter = require('./routers/categories');


//middleware
app.use(express.json());
app.use(morgan('tiny'));
app.use(cors());
app.use('*', cors());
app.use(authJwt());
app.use(errorHandler)



//Routers
app.use(`${api}/products`, productsRouter)
app.use(`${api}/oders`, ordersRouter)
app.use(`${api}/categories`, categoriesRouter)
app.use(`${api}/users`, usersRouter)


mongoose.set("strictQuery", false)
mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() =>{
        console.log('DB connection is successful')
    })
    .catch((err)=>{
        console.log(err)
    })


app.listen(3000, ()=>{
    console.log('app is running on port 3000')
})

