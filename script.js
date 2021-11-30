const bodyParser = require('body-parser')
const express = require('express');
const app = express();
const port = 3000;

//app.use(express.static('public')); // oproepen van de folder waar files staan om te laten zien
app.use(bodyParser.json());

app.get('/', (req, res) => {
    console.log(' get local call');
})

app.get('/test', (req, res) => {
    console.log('Iets proberen');
})

app.get('/data', (req, res) => {
    let testData = {
        name: "test",
        probleem: "pc"
    }
})
app.post('/saveData', (req, res) => {
    console.log(req.body);

    res.send(`Data received with id:${req.body.id}`);
})

app.listen(port, () => {
    console.log(`api is listening at http://localhost:${port}`)
})