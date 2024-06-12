require('../models/database');
const Category = require('../models/Category');
const Collection = require('../models/Collection');

/**
 * GET /
 * Homepage
 */
exports.homepage = async(req,res) => {
    //logic of every page
    
    try{
        const limitNumber = 5;// set constant number of displays
        const categories = await Category.find({}).limit(limitNumber);
        
        // query the latest collections
        const latest = await Collection.find({}).sort({_id: -1}).limit(limitNumber);
        const romance = await Collection.find({'category': 'Romance'}).limit(limitNumber);
        const thriller = await Collection.find({'category': 'Thriller'}).limit(limitNumber);
        const fantasy = await Collection.find({'category': 'Fantasy'}).limit(limitNumber);
        const science_fiction = await Collection.find({'category': 'Science Fiction'}).limit(limitNumber);
        const historical_fiction = await Collection.find({'category': 'Historical Fiction'}).limit(limitNumber);
        
        const book = {latest,romance,thriller,fantasy,science_fiction,historical_fiction};
    
        // display categories
        res.render('index',{title: 'Book Blog - Home', categories,book});//render index page
    } catch(error) {
        res.status(500).send({message: error.message || 'Error Occured'});
    }
}


/**
 * GET /categories
 * Categories
 */
exports.exploreCategories = async(req,res) => {
    //logic of every page
    
    try{
        const limitNumber = 20;// set constant number of displays
        const categories = await Category.find({}).limit(limitNumber);
    
        // display categories
        res.render('categories',{title: 'Book Blog - Categories', categories});//render index page
    } catch(error) {
        res.status(500).send({message: error.message || 'Error Occured'});
    }
}

/**
 * GET /categories/:id
 * CategoriesById
 */
exports.exploreCategoriesById = async(req,res) => {
    //logic of every page
    
    try{
        let categoryId = req.params.id;
        const limitNumber = 20;// set constant number of displays
        const categoryById = await Collection.find({'category':categoryId}).limit(limitNumber);
    
        // display categories
        res.render('subcategories',{title: 'Book Blog - Categories', categoryById});//render index page
    } catch(error) {
        res.status(500).send({message: error.message || 'Error Occured'});
    }
}

/**
 * GET /collections/:id
 * CollectionsId
 */
exports.exploreCollections = async(req,res) => {
    //logic of every page
    
    try{
        // get the id
        let collectionId = req.params.id;

        const collections = await Collection.findById(collectionId);
        // display categories
        res.render('collections',{title: 'Book Blog - Collections', collections});//render index page
    } catch(error) {
        res.status(500).send({message: error.message || 'Error Occured'});
    }
}

/**
 * POSt /search/:id
 * Search
 */
exports.searchBook = async(req,res) => {
    //searchTerm    
    try{
        let searchTerm = req.body.searchTerm;
        let book = await Collection.find({ $text: { $search: searchTerm, $diacriticSensitive: true}});
        res.render('search',{title: 'Book Blog - Search',book});
    } catch(error) {
        res.status(500).send({message: error.message || 'Error Occured'});
    }
}

/**
 * GET /explore-latest
 * Explore Latest
 */
exports.exploreLatest = async(req,res) => {   
    try{
        const limitNumber = 20;
        const book = await Collection.find({}).sort({_id: -1}).limit(limitNumber);
        res.render('explore-latest',{title: 'Book Blog - Explore Latest',book});
    } catch(error) {
        res.status(500).send({message: error.message || 'Error Occured'});
    }
}


/**
 * GET /explore-random
 * Show Random
 */
exports.exploreRandom = async(req,res) => {   
    try{
        const limitNumber = 1;
        let count = await Collection.find().countDocuments();
        let random = Math.floor(Math.random() * count);
        let book = await Collection.find().skip(random).limit(limitNumber);
        res.render('explore-random',{title: 'Book Blog - Show Random',book});
    } catch(error) {
        res.status(500).send({message: error.message || 'Error Occured'});
    }
}

/**
 * GET /submit-book
 * Submit book review
 */
exports.submitBook = async(req,res) => {   
    try{
        const infoErrorsObj = req.flash('infoErrors');//set an object
        const infoSubmitObj = req.flash('infoSubmit');//set an object
        res.render('submit-book',{title: 'Book Blog - Submit Review',infoErrorsObj,infoSubmitObj});
    } catch(error) {
        res.status(500).send({message: error.message || 'Error Occured'});
    }
}

/**
 * POST /submit-book
 * Submit book review
 */
exports.submitBookOnPost = async(req,res) => {   
    try{
        let imageUploadFile;
        let uploadPath;
        let newImageName;

        if(!req.files || Object.keys(req.files).length === 0){
            console.log('No files were uploaded');
        } else {
            imageUploadFile = req.files.image;
            newImageName = Date.now() + imageUploadFile.name;

            uploadPath = require('path').resolve('./') + '/public/uploads/' + newImageName;

            imageUploadFile.mv(uploadPath,function(err) {
                if(err) return res.status(500).send(err);
            } );
        }

        const newReview = new Collection({
            name: req.body.name,
            description: req.body.description,
            author: req.body.author,
            rate: req.body.rate,
            category: req.body.category,
            image: newImageName,
        });
        // save
        await newReview.save();
        
        req.flash('infoSubmit','Book Review has been added.');
        res.redirect('/submit-book');
    } catch(error) {
        req.flash('infoErrors',error);
        res.redirect('/submit-book');
    }
}

exports.exploreAbout = async(req,res) => {
    try{
        res.render('about',{title: 'Book Blog - About'});
    } catch(error){
        res.status(500).send({message: error.message || 'Error Occured'});
    }
}


// update review
// async function updateReview(){
//     try{
//         const review = await Collection.updateOne({name: 'warcross'},{name: 'Harry Potter 1'});
//         res.n ; //number of documents matched
//         res.nModified; //documents modified
//     } catch(error){
//         console.log(error);
//     }
// }
// updateReview();

// delete review
// async function deleteReview(){
//     try{
//         await Collection.deleteOne({_id:'65e3240338a6d4b7c76ae018'});
//     } catch(error){
//         console.log(error);
//     }
// }
// deleteReview();


// // dumy data to check connection and database
// async function insertDummyCollectionData(){
//     try{
//         await Collection.insertMany([
//             {
//                 "name": "The Spanish Love Deception",
//                 "description":"Catalina Martín desperately needs a date to her sister’s wedding. Especially since her little white lie about her American boyfriend has spiralled out of control. Now everyone she knows—including her ex and his fiancée—will be there and eager to meet him. She only has four weeks to find someone willing to cross the Atlantic and aid in her deception. New York to Spain is no short flight and her raucous family won’t be easy to fool. Enter Aaron Blackford—her tall, handsome, condescending colleague—who surprisingly offers to step in. She’d rather refuse; never has there been a more aggravating, blood-boiling, and insufferable man. But Catalina is desperate, and as the wedding draws nearer, Aaron looks like her best option. And she begins to realize he might not be as terrible in the real world as he is at the office.", 
//                 "author":"Elena Armas",
//                 "rate": "3/5",
//                 "category":"Romance",
//                 "image": "romance.jpg"
//             },
//             {
//                 "name": "Don't Turn Around",
//                 "description":"Sixteen-year-old Noa has been a victim of the system ever since her parents died. Now living off the grid and trusting no one, she uses her computer-hacking skills to stay safely anonymous and alone. But when she wakes up on a table in an empty warehouse with an IV in her arm and no memory of how she got there, Noa starts to wish she had someone on her side. Enter Peter Gregory. A rich kid and the leader of a hacker alliance, Peter needs people with Noa's talents on his team. Especially after a shady corporation called AMRF threatens his life in no uncertain terms. But what Noa and Peter don't realize is that Noa holds the key to a terrible secret, and there are those who'd stop at nothing to silence her for good.", 
//                 "author":"Michelle Gagnon",
//                 "rate": "4.5/5",
//                 "category":"Thriller",
//                 "image": "thriller.jpg"
//             },
//             {
//                 "name": "Harry Potter and the Deathly Hallows",
//                 "description":"Harry Potter and the Deathly Hallows finishes off an exciting series that is one of the best of all time. In this book Harry finds out that he must kill Lord Voldemort and can only do so by finding his hidden Horcruxes. The book contains an astonishing ending and many characters fight for their lives. It also has twists, turns and plenty of action as Harry, Ron and Hermione run from Death Eaters on the quest to kill Voldemort. I would recommend this book for older readers and adults. Also, I would recommend reading the books before this one to understand what is going on in the story. It is an overall action-packed adventure.", 
//                 "author":"J. K. Rowling",
//                 "rate": "4.9/5",
//                 "category":"Fantasy",
//                 "image": "fantasy.jpg"
//             },
//             {
//                 "name": "Dune",
//                 "description":"It's so hard to sum up this truly magnificent bit of storytelling and universe creation. In my mind its in the same top-tier with the classics of science fiction and fantasy, standing shoulder to shoulder with likes of Tolkien's masterpiece Lord of the Rings and Azimov’s Foundation Trilogy. People often view it as a pure science fiction novel - which it is - but it is so much more. It is a commentary on religion, myth, fanaticism, love, hate, wisdom passed through generations, loyalty, courage, betrayal, and the complicated interconnectedness and balance of planetary ecosystems. And that is just scratching the surface! If you're not ready for a book with that level of complexity -- one requiring you to engage your brain at all times -- I recommend you take a pass. If you’re ready for a mind-bending, sweeping narrative with interesting characters, good writing and a satisfying plot, this may be the perfect book for you. I first read it 48 years ago, not long after it was published, and I was hooked. I re-read it two years ago and it felt as relevant today as it did in 1975.  In 1980 I recommended it to my English Literature girlfriend (later wife) who said (with her nose in the air) ‘I don’t really like science fiction that much.’ But I persisted, and she decided to read it.  16 books-in-the-series-later she admitted that it was one of her favorite books of all time (and she has read literally thousands).  If I could give it 6 stars I would.", 
//                 "author":"Frank Herbert",
//                 "rate": "4.5/5",
//                 "category":"Science Fiction",
//                 "image": "science-fiction.jpg"
//             },
//             {
//                 "name": "An Orphan's War",
//                 "description":"Liverpool 1939. At the start if the story Maxine marries her best friend throughout childhood, Johnny. Days after their wedding he leaves to join the army and only months after that he is killed while fighting. Maxine is training as a nurse and decides that a change will do her good so she moves to London to complete her training at St. Thomas's Hospital. There a handsome surgeon takes an interest in her. After the relationship ends Maxine returns to Liverpool where she has to face up to new challenges, and make a fresh start. She takes a job at an orphanage, where she feels she's found her real calling and a home, but not everything goes smoothly, her secret comes to light and threatens her future. A lovely read, always plenty happening, a delight!", 
//                 "author":"Molly Green",
//                 "rate": "4.8/5",
//                 "category":"Historical Fiction",
//                 "image": "historical-fiction.jpg"
//             },
//         ]);
//     } catch (error) {
//         console.log('err', + error);
//     }
// }
// insertDummyCollectionData();


// // dumy data to check connection and database
// async function insertDummyCategoryData(){
//     try{
//         await Category.insertMany([
//             {
//                 "name": "Young Adult",
//                 "image": "young-adult.jpg"
//             },
//             {
//                 "name": "Biography/Autobiography",
//                 "image": "biography.jpg"
//             },
//             {
//                 "name": "History",
//                 "image": "history.jpg"
//             },
//             {
//                 "name": "Science",
//                 "image": "science.jpg"
//             },
//             {
//                 "name": "Travel",
//                 "image": "travel.jpg"
//             },
//             {
//                 "name": "Finance",
//                 "image": "finance.jpg"
//             },
//             {
//                 "name": "Philosophy",
//                 "image": "philosophy.jpg"
//             },
//             {
//                 "name": "Art",
//                 "image": "art.jpg"
//             },
//             {
//                 "name": "Comics",
//                 "image": "comics.jpg"
//             },
//         ]);
//     } catch (error) {
//         console.log('err', + error);
//     }
// }
// insertDummyCategoryData();