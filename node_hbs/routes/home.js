const {Router} = require ('express')
const router = Router()

router.get('/', (req, res) => {
    res.render('index', {
        title: "Home-page",
        isHome: true
    })
    // res.sendFile(path.join(__dirname, 'vievs', 'index.html'))
})

module.exports = router