// import the express framework
import express from 'express';

var MongoClient = require('mongodb').MongoClient;
// create app object
const app = express();
app.use(express.json()); // parses the json object included in the request body
var url='mongodb+srv://usertest09:Middlesexuni@cluster0.bcxqd.mongodb.net/userwebbapp?retryWrites=true&w=majority';
const port = process.env.PORT || 3000

// post route
app.post('/hello', (req, res) => {
    res.send(`Hello ${req.body.name}`);
})

app.get('/lessons', async (req, res) => {
    const client = await MongoClient.connect(url,
        { useNewUrlParser: true, useUnifiedTopology: true }
    );
    const db = client.db('userwebbapp');
    const lessons = await db.collection('lessons').find({}).toArray();  
    res.status(200).json(lessons);
    client.close();
});
app.get('/orders', async (req, res) => {
    const client = await MongoClient.connect(
        url,
        { useNewUrlParser: true, useUnifiedTopology: true }
    );
    const db = client.db('userwebbapp');
    const orders = await db.collection('orders').find({}).toArray();  
    res.status(200).json(orders);
    client.close();
});
app.post('/orders', (req, res) => {
    MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("userwebbapp");
        dbo.collection("orders").insertOne({
            id: req.body.id,
            spaces: req.body.spaces,
            name: req.body.name,
            number: req.body.number,
        }, 
        function(err) {
            if (err) throw err;
            res.sendStatus(200);
            db.close();
        });
    });
});
app.put('/lessons/update-lesson',async (req, res) => {
    // initiate DB connection
    const client = await MongoClient.connect(
        url,
      { useNewUrlParser: true, useUnifiedTopology: true }  );
    const db = client.db('userwebbapp');
    const lesson = await db.collection('lessons').updateOne(
    {id: req.body.id }, 
    {$set: req.body});
    res.status(200).json(lesson);
    client.close();
});
// set server to listen
app.listen(port, () => {
    console.log('Server is listening');
})