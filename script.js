const express = require('express');
const fs = require('fs/promises');
const bodyParser = require('body-parser');
const {MongoClient} = require ('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;


const client = new MongoClient(process.env.FINAL_URL);
const dbName = "session7";



app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.send('Getting local call');
})

app.get('/allChallenges', async (req, res) => {
    try {
        await client.connect();
        
        const db = client.db(dbName)
        const colli = db.collection('challenges');
        const findChallenge = await colli.find({}).toArray();

        res.status(200).send(findChallenge);
       } catch (err) {
        console.log('get',err);
        res.status(500).send({
            err: 'Something went wrong. Try again',
            value: err
        })
    }

    finally {
       await client.close();
   }

})
app.post('/saveChallenge', async (req, res) => {
    console.log(req.body)

    if (!req.body.name || !req.body.points || !req.body.course ||!req.body.session){
        res.status(400).send('Something went wrong. Please enter name, points and course');
        return;
    }

    try {
        await client.connect();

        const db = client.db(dbName)
        const colli = db.collection('challenges');
        const dubbleChallenge = await colli.findOne({name: req.body.name})

        if(dubbleChallenge){
            res.status(400).send('Bad request: boardgame already exists with name ' + req.body.name);
            return;
        }

        let newChallenge = {
            name: req.body.name,
            points: req.body.points,
            course: req.body.course,
            session: req.body.session
        }

        let insertResultChallenge = await colli.insertOne(newChallenge);

        res.status(201).send(`The challenge is succesfully saved. Here is some info: ${req.body.name}`)
        return;
        
    }catch (err) {
        console.log('post',err);
        res.status(500).send({
            err: 'Something went wrong. Try again',
            value: err
        })
    }
    finally{
        await client.close();
    }
})

app.put('/allChallenges/:id', (req, res) => {
    res.send('Update oki');
});
  
app.delete('/allChallenges/:id', (req, res) => {
    res.send('Delete oki');
});

app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`)
})
