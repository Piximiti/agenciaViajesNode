import express from 'express';
import router from './routes/index.js';
import db from './config/db.js';

const app = express();

db.authenticate()
    .then( () => console.log('Base de datos conectada'))
    .catch(error => console.log(error));

//Definir Puerto
const port = process.env.PORT || 4000;

//Habilitar PUG
app.set('view engine', 'pug');

//Obtener el año actual
app.use((req, res, next) => {
    const year = new Date();
    res.locals.actualYear = year.getFullYear();
    res.locals.nombresitio = "Agencia de Viajes";
    next();
});

app.use(express.urlencoded({extended: true}));

//Definir la carpeta pública
app.use(express.static('public'))

//Agregar el router
app.use('/', router);

app.listen(PORT);