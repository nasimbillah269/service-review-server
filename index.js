const express = require('express');
const cors = require('cors');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;

//midlwere
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('special food service review server running')
})

app.listen(port, () => {
    console.log(`special food service review server nunning on: ${port}`);

})