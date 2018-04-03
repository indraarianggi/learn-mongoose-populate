// BASE SETUP
// =============================================================================
// memanggil semua package/dependensi yang dibutuhkan
var express = require('express');
var app = express();                        // mendefinisikan app menggunakan express
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Person = require('./models/person');
var Story = require('./models/story');

// koneksi ke mongodb database lokal
mongoose.connect('mongodb://localhost/dblearnpopulate');

// konfigurasi app untuk menggunakan body-parser
// ini mengijinkan untuk mendapatkan data dari metode POST
app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());


// ROUTES FOR API
// =============================================================================
// instance dari express Router
var router = express.Router();

// minddleware yang digunakan untuk semua request
router.use((req, res, next) => {
    console.log('Somethis is happening.');
    next(); // ke router selanjutnya, tidak berhenti disini
});

router.get('/', (req, res) => {
    res.json({ message: 'Learn about Mongoose Population (Populate)' });
});

// routes yang berakhiran /person
// ----------------------------------------------------
router.route('/person')     // menangani multiple route untuk URI yang sama

    // membuat person baru (akses POST ke http://localhost:3000/api/person)
    .post((req, res) => {
        var newPerson = new Person({
            name: req.body.name,
            age: req.body.age,
            address: req.body.address
        });

        newPerson.save((err) => {
            if (err) res.send(err);

            res.json({ message: 'Person created!' });
        });
    })

    // mendapatkan semua person (akses GET ke http://localhost:3000/api/person)
    .get((req, res) => {
        Person.find((err, data) => {
            if (err) res.send(err);

            res.json(data);
        });
    });


// routes yang berakhiran /story
// ----------------------------------------------------
router.route('/story')
    
    // membuat story baru (akses POST ke http://localhost:3000/api/story)
    .post((req, res) => {
        var newStory = new Story({
            title: req.body.title,
            date: new Date(),
            author: req.body.author
        });

        newStory.save((err) => {
            if (err) res.send(err);

            res.json({ message: 'Story created!' });
        });
    })

    // mendapatkan semua person (akses GET ke http://localhost:3000/api/person)
    .get((req, res) => {
        // find story using populate => note the difference in results
        Story.find()
            .populate('author')
            .exec((err, data) => {
                if (err) res.send(err);

                res.json(data);
            });
    });

// mendapatkan story dengan id tertentu (akses GET ke http://localhost:3000/api/story/:story_id)
router.get('/story/:story_id', (req, res) => {
    Story.findById(req.params.story_id)
        .populate('author', 'name') // field selection => just show name field in populated document
        .exec((err, data) => {
            if (err) res.send(err);

            res.json(data);
        });
});

// mendapatkan data author melalui story dengan id tertentu (akses GET ke http://localhost:3000/get_author/:story_id)
router.get('/get_author/:story_id', (req, res) => {
    Story.findById(req.params.story_id)
        .populate('author')
        .exec((err, data) => {
            if (err) res.send(err);

            author_data = {
                name: data.author.name,         // access author(person) name
                address: data.author.address    // access author(person) address
            };
            res.json(author_data);
        });
})


// register routes
// semua route (url) akan diawali dengan /api
app.use('/api', router);


// START THE SERVER
// =============================================================================
app.listen(3000);
console.log('Server start at port 3000');

