const Product = require('../models/product');
const {mongoose} = require('../database/database');

let products = [
    new Product({
        imagePath: 'https://upload.wikimedia.org/wikipedia/vi/thumb/3/3a/Diablo_Coverart.png/220px-Diablo_Coverart.png',
        title: 'Diablo Game',
        description: 'Awesome Game!!!!',
        price: 10
    }),
    new Product({
        imagePath: 'https://news.hanoicomputer.vn/wp-content/uploads/2019/12/HOMYBLKG3VADHOEPWNR5YX4ATA.jpg',
        title: 'League of Legend',
        description: 'Great',
        price: 0
    }),
    new Product({
        imagePath: 'https://cdn.oneesports.gg/wp-content/uploads/sites/4/2019/12/dota-2-7.23e-1024x576.jpg',
        title: 'Dota 2',
        description: 'Good',
        price: 0
    }),
    new Product({
        imagePath: 'https://images.gametac.vn/articles/2020/2/12/DarkSoul%203/cover.jpg',
        title: 'Dark Soul',
        description: 'Good',
        price: 0
    }),
    new Product({
        imagePath: 'https://upload.wikimedia.org/wikipedia/vi/c/c7/World_of_Warcraft_poster.jpg',
        title: 'World of Warcraft',
        description: 'Good',
        price: 0
    }),
];

let done = 0;
for(let i = 0; i < products.length; i++){
    products[i].save(function(err, result){
        done++;
        if(done == products.length){
            exit();
        }
    });
}

function exit() {
    mongoose.disconnect();
}