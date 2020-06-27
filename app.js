const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 4041;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const crms = [{cod: '1234567-8'}]

app.get('/', (_, res) => {
    res.send('Your Express App');
});


app.get('/crms', (_, res) => {
    res.json({ ok: true, crms });
});

app.get('crms/:cod', (req, res) => {
    const { cod } = req.params;
    const crms = crms.filter((cod) => crms.cod === cod)[0];
    res.json({ ok: true, crms });
});

app.post('/addcrms', (req, res) => {
    const { cod } = req.body;
    var digito = cod.charAt(7);
    if (cod.length == '9' && digito == '-') {
        crms.push({ cod });
        res.json({ ok: true, crms });
    } else {
        res.send('A CRM nao e valido!!');
    }
});

app.listen(port, () => {
    console.log(`Server is runing on port: ${port}`);
});