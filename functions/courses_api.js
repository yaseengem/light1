
// build multiple CRUD interfaces:
app.get('/courses/', async (req, res) => {
    const crud_collection1 = require('./crud_collection');
    const crud_collection = new crud_collection1();
    const course_sublist_string = await crud_collection.getAllItems('courses');
    console.log("In index.js: " + JSON.stringify(course_sublist_string));
    res.status(200).json(course_sublist_string);
});
app.post('/courses/', async (req, res) => {
    const crud_collection1 = require('./crud_collection');
    const crud_collection = new crud_collection1();
    console.log("body. name in Index: " + req.body.name);
    var new_course = { name: req.body.name, desc: req.body.desc, authors: req.body.authors, duration: req.body.duration };
    console.log ("New Course name is : " + JSON.stringify(new_course));
    const added_count = await crud_collection1.addItem('courses', JSON.stringify(new_course));
    console.log("Completed In index.js: " + added_count);
    if (added_count > 0) {
        res.status(200).json(added_count);
    } else{
        res.status(501).json("Error");
    }
});
// app.post('/', (req, res) => {
//     clist.addCourse();
//     res.json({ 'Good message': 'post' });
// });



app.get('/:id', (req, res) => {
        
});

app.put('/:id', (req, res) => {
    // clist.addCourse();
});
app.delete('/:id', (req, res) => {
});

