const express = require('express');
const cors = require("cors");
const helmet = require("helmet");
const app = express();
 
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));
app.use(helmet());

app.get('/', (req, res) => {
    res.send("Hello World");
});

const courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' }
];

const users = [
    { id: 1, userName: "zpass1", password: "lonelyPass1" },
    { id: 2, userName: "zpass2", password: "myZPass2" } 
]

app.get('/users', (req, res) => {
    res.send(users);
})
app.get('/api/courses', (req, res) => {
    res.send(courses);
});

// app.post('/api/courses', (req, res) => {
//     const course = {
//         id: courses.length + 1,
//         name: req.body.name
//     };
//     courses.push(course);
//     res.send(course);
// });

app.post('/login', (req, res) => {
    const userName = req.body.userName;
    const password = req.body.password;
    const isUser = users.find((user) => user.userName === userName);
    console.log("isUser ", isUser);
    
    if (!isUser) return res.status(401).json("user not found");
    res.status(200).json("login successful");

    // const hashedPassword = CryptoJS.decrypt(
    //     user.password,
    //     process.env.PASS_SEC
    // )
    // const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    // originalPassword !== req.body.password && res.status(401).json("Wrong password!");
    
    // const { password, ...others } = user;
    // const token = jwt.sign(
    //     ...others, process.env.JWT_SEC
    // )
})

app.listen(port, () => console.log(`listening on port ${port}`));
