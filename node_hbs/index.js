const express = require('express');
const path = require('path')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const homeRoutes = require("./routes/home")
const addRoutes = require("./routes/courses")
const coursesRoutes = require("./routes/add")
const cardRoutes = require("./routes/card")
const ordersRoutes = require("./routes/orders")
const User = require("./models/user")



const app = express();

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(async (req, res, next) => {
    try {
        const user = await User.findById('5d5fdd5c947ee0148079486c')
        req.user = user
        next()
    } catch (err) {
        console.log(err)
    }
})

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))

app.use('/', homeRoutes)
app.use('/courses', addRoutes)
app.use('/add', coursesRoutes)
app.use('/card', cardRoutes)
app.use('/orders', ordersRoutes)

const PORT = process.env.PORT || 8080
async function start() {
    try {
        //conet to DB
        const pass = `DbCtJkANbhgD4vLj`
        const url = `mongodb+srv://dtkachov:${pass}@cluster0-cdza6.mongodb.net/shop`

        await mongoose.connect(url, { 
            useNewUrlParser: true,
            useFindAndModify: false
        })
        const candidate = await User.findOne()
        if (!candidate) {
            const user = new User ({
                email: 'Tkachov',
                name: 'Dima',
                cart: {items: []}
            })
            await user.save()
        }
        
        app.listen(PORT, () => {
            console.log(`Server is runing on port ${PORT}`)
        })
    } catch (err) {
        console.log(err)
    }
}

start()




