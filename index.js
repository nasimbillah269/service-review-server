const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;

//midlwere
app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.20te8rd.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



async function run() {
    try {
        const serviceCollection = client.db('foods').collection('services');
        const reviewCollection = client.db('foods').collection('reviews');
        // console.log(reviewCollection)



        app.get('/services', async (req, res) => {
            const query = {};
            const cursor = serviceCollection.find(query);
            const services = await cursor.toArray();
            res.send(services)
        })

        app.post('/services', async (req, res) => {
            const service = req.body;
            const result = await serviceCollection.insertOne(service);
            res.send(result)
        })

        app.get('/services/limit', async (req, res) => {
            const query = {};

            const cursor = serviceCollection.find(query);
            const services = await cursor.limit(3).toArray();
            res.send(services)
        })

        app.get('/services/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const services = await serviceCollection.findOne(query);
            res.send(services)
        })

        app.get('/reviews', async (req, res) => {
            const query = {}
            const cursor = reviewCollection.find(query)
            const reviews = await cursor.toArray();
            res.send(reviews)
        })
        app.get('/reviews/:id', async (req, res) => {
            const id = req.params.id;

            const query = { _id: ObjectId(id) }
            const reviews = await reviewCollection.findOne(query)

            res.send(reviews)
        })

        app.post('/reviews', async (req, res) => {
            const review = req.body;
            const result = await reviewCollection.insertOne(review);
            res.send(result)
        })

        app.put('/reviews/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const review = req.body;
            console.log(review);
            const option = {
                upsert: true
            }
            const updatedDoc = {
                $set: {
                    name: review.name,
                    email: review.email,
                    userName: review.userName,
                    photoURL: review.photoURL,
                    serviceId: review.serviceId,
                    serviceImage: review.serviceImage,
                    reviewMassage: review.reviewMassage
                }
            }
            const result = await reviewCollection.updateOne(query, updatedDoc, option);
            res.send(result)
        })

        app.delete('/reviews/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result = await reviewCollection.deleteOne(query);
            res.send(result)
        })

    }
    finally {

    }
}
run().catch(err => console.error(err))

app.get('/', (req, res) => {
    res.send('special food service review server running')
})

app.listen(port, () => {
    console.log(`special food service review server nunning on: ${port}`);

})