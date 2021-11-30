const express = require('express');
const fs = require('fs/promises');
const bodyParser = require('body-parser');
const {MongoClient} = require ('mongodb');

const url = "mongodb+srv://teamJasmien:teamJasmien@cluster0.dfugl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";   //FOUT
const client = new MongoClient(url);
const dbName = "session7";

const app = express();
const port = 3000;


app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.send(' get local call');
})

app.get('/challenges', async (req, res) => {
    try {
        await client.connect();
        const db = client.db("session7")
        //retrieve the boardgame collection data
        const colli = db.collection('boardgames');
        let testData = {
            name: "challenge1",
            course: "web2"
        }

        //Send back the data with the response
        res.status(200).send(testData);
       } catch (err) {
        console.log(err.stack);
    }

    finally {
       await client.close();
   }

    // try{
    //     //connect to the db
    //     await client.connect();

    //     //retrieve the boardgame collection data
    //     const db = dbName;
    //     const colli = client.db('session7').collection('challenges');
    //     const bgs = await colli.find({}).toArray();

    //     //Send back the data with the response
    //     let testdata = {
    //         name: 'Challenge',
    //         course: 'WebII'
    //     }
    //     res.send(testdata);
    // }catch(error){
    //     console.log(error)
    //     res.status(500).send({
    //         error: 'Something went wrong',
    //         value: error
    //     });
    // }finally {
    //     await client.close();
    // }
})

app.listen(port, () => {
    console.log(`api is listening at http://localhost:${port}`)
})