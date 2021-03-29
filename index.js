const express = require ('express');
const bodyParser = require ('body-parser');
const cors = require ('cors');
const path = require ('path');
const morgan = require ('morgan');
const methodOverride = require ('method-override');
const helmet = require('helmet')
Promise = require('bluebird');

const {logs} = require('./vars');
const routes = require ('./routes/flickrRoutes');
const error = require ('./middlewares/error');
const { port, env } = require('./vars');

const app = express();
app.use(morgan(logs));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride());
app.use(helmet());
app.use(cors());

app.use('/api/v1', routes);

if (process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '../../client/build')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname,'../../client/build', 'index.html'));
    });
}

// app.use(error.converter);
// app.use(error.handler);

app.listen(port, () => console.info(`server started on port ${port} (${env})`));

module.exports = app;