require('dotenv').config();

const app = require('./server');
require('./database');

app.listen(process.env.PORT || 3000, () => {
    console.log(`Servidor en el puerto: ${app.get('port')}`);
});