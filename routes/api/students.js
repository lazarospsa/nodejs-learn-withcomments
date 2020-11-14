//kanw eisagwgh kai edw to express k to student dioti to xrhsimopoioun ta routes
const express = require('express')
//eisagagw to diko mou module
const students = require('../../data/students')
const router = express.Router()

// router.get('/', (req, res) => res.send('api'))
// router.get('/alloapi', function (req, res) {
//     res.send('alloapi'); console.log("alloapi called")
// })
router.get('/', (req, res) => res.json(students))
router.get('/:id', (req, res) => {
    //vazw se mia metavlith to ti 9a apanthsei o server sto erwthma tou episkepth
    let student = students.find(x => x.id == req.params.id)

    //me to res.send stelnoume sthn o9onh to param pou evale o xrhsths sto url
    // res.send(req.params.id)

    //elegxw ean uparxei to apotelesma p zhthse
    if (student){
        res.json(
            //h filter epistrefei array
            // students.filter(x => x.id == req.params.id)
            //h find epistrefei json epeidh einai 1 mono to antikeimeno (vash tou id dld)
            //dld find -> fernei mono to prwto stoixeio p teroiazei me thn parametro p zhtaei o xrhsths
            // students.find(x => x.id == req.params.id)
            students.find(x => x.id == req.params.id)
        )
    }
    if (!student) res.json({'status':'Den vre9hke o student autos'})
})

module.exports = router