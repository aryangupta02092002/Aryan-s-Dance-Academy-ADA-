// Run at localhost:8000

const express = require("express")
const path = require("path");
// const fs=require();
const app = express();

const mongoose = require('mongoose');
const bodyparser=require("body-parser")
mongoose.connect('mongodb://localhost/contactDance', { useNewUrlParser: true, useUnifiedTopology: true });

const port = 8000;

// Define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
});

const Contact = mongoose.model('Contact', contactSchema);


app.use('/static', express.static('static'))     //for serving static file
app.use(express.urlencoded())

//Pug specific stuff
app.set('view engine', 'pug')           //Set the template engine as pug
app.set('views', path.join(__dirname, 'views'))            //set the views directory


//End points
app.get('/', (req, res) => {
    const params = { }
    res.status(200).render('home.pug', params);
})
app.get('/about', (req, res) => {
    const params = { }
    res.status(200).render('about.pug', params);
})
app.get('/services', (req, res) => {
    const params = { }
    res.status(200).render('services.pug', params);
})
app.get('/classInfo', (req, res) => {
    const params = { }
    res.status(400).render('classInfo.pug', params);
})

app.get('/contact', (req, res) => {
    const params = { }
    res.status(200).render('contact.pug', params);
})

app.post('/contact', (req, res) => {
    var myData=new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to the database.")
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database.")
    });

    // res.status(200).render('contact.pug');
})

app.listen(port, () => {
    console.log(`Application started successfully on port ${port}`);
})