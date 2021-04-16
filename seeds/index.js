const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author:"604b20372577f84e68783f0d",
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            geometry: { type: 'Point',
                        coordinates: [ cities[random1000].longitude,
                                       cities[random1000].latitude ] },

            images:[
                {
                  _id: '604f09160ac8cd4a046d17e8',
                  url:'https://res.cloudinary.com/dfokh7ald/image/upload/v1616003473/YelpCamp/pve0hb1c34ofustimtdc.png',
                  filename: 'YelpCamp/pve0hb1c34ofustimtdc'
                },
                {
                  _id: '604f09160ac8cd4a046d17e9',
                 url:'https://res.cloudinary.com/dfokh7ald/image/upload/v1616050402/YelpCamp/z8sqwqrzs0exbudgtphy.jpg',          
                 filename: 'YelpCamp/z8sqwqrzs0exbudgtphy'

                }
              ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})