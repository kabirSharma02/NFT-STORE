const mongoose = require('mongoose');
const Product = require('./models/product');

const products = [
    {
        name: "BLACK MONKEY",
        img: "https://images.unsplash.com/photo-1556656793-08538906a9f8?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aXBob25lfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        price: 200,
        desc: ""
    },
    {
        name: "FUNKY MONKEY",
        img: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c3BvcnRzJTIwc2hvZXN8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        price: 300,
        desc: ""
    },
    {
        name: "FLY Drones",
        img: "https://images.unsplash.com/photo-1579829366248-204fe8413f31?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8ZHJvbmVzfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        price: 999,
        desc: ""
    },
    {
        name: "SPACE Drones",
        img: "https://images.unsplash.com/photo-1506947411487-a56738267384?ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8ZHJvbmVzfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        price: 9900,
        desc: ""
    },
    {
        name: "Camera",
        img: "https://images.unsplash.com/photo-1516724562728-afc824a36e84?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGNhbWVyYXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        price: 9900,
        desc: ""
    },
    

];


const seedDB = async() => {
    
    await Product.insertMany(products);

    console.log("DB Seeded");

}


module.exports = seedDB