const express = require('express');
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
require('dotenv').config({ path: './.env' });
const routes = require('./src/routes');
const cors = require('cors');
const app = express();
app.use(cookieParser());
app.use(morgan("dev"));

app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", '*');
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization, pragma, cache-control"
    );
    res.header("Access-Control-Allow-Credentials", true);
    if (req.method === "OPTIONS") {
        // Verificar se não usamos outros verbos
        res.header("Access-Control-Allow-Methods", "POST, GET");
        // res.header("Access-Control-Allow-Credentials", true);
        return res.status(200).json({});
    }
    app.use(cors());
    next();
});
app.use('/',routes);


/**
 * Lida com erro 404: Recurso não encontrado
 */
app.use((req, res, next) => {
    console.log('cuu')
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
});

/**
 * Lida com erros não mapeados
 */
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message,
        },
    });
});

app.listen(3000, '0.0.0.0', () => { console.log("Servidor escutando na porta 3000") });
