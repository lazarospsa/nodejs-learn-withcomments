//kanw eisagwgh kai exw to express dioti to xrhsimopoioun ta routes
const express = require('express')
const path = require('path')
const router = express.Router()

router.get('/', (req, res) => res.send('Hello World!'))
router.get('/about', (req, res) => res.send('about us'))
router.get('/html', (req, res) => {
    res.sendFile(
        path.join(__dirname, '../public', 'second.html')
    )
})

module.exports = router