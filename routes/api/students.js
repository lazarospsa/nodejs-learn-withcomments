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
    if (student) {
        res.json(
            //h filter epistrefei array
            // students.filter(x => x.id == req.params.id)
            //h find epistrefei json epeidh einai 1 mono to antikeimeno (vash tou id dld)
            //dld find -> fernei mono to prwto stoixeio p teroiazei me thn parametro p zhtaei o xrhsths
            // students.find(x => x.id == req.params.id)
            students.find(x => x.id == req.params.id)
        )
    }
    if (!student) res.json({ 'status': 'Den vre9hke o student autos' })
})
router.post('/', (req, res) => {
    let new_student = {
        "id": req.body.id,
        "first_name": req.body.first_name,
        "last_name": req.body.last_name,
        "email": req.body.email,
        "gender": req.body.gender,
        "ip_address": req.body.ip_address
    }
    students.push(new_student)
    res.json(new_student)
})
router.put('/:id', (req, res) => {
    let student = students.find(x => x.id == req.params.id)
    if (student) {
        students.forEach(s => {
            if(s.id == student.id){
                //ternaries - dld if in row opou shmainei
                //meta to erwthmatiko vazoume thn timh p 9eloume se periptwsh pou isxuei h prwth sun9ikh
                //kai meta thn anw katw teleia vazoume thn timh opou den isxuei h prwth sun9ikh
                s.first_name = req.body.first_name ? req.body.first_name : s.first_name,
                s.last_name = req.body.last_name ? req.body.last_name : s.last_name,
                s.email = req.body.email ? req.body.email : s.email,
                s.gender = req.body.gender ? req.body.gender : s.gender,
                s.ip_address = req.body.ip_address ? req.body.ip_address : s.ip_address
            }
        })

        students.push(student)
        res.json(student)
    }
    if (!student) res.json({ 'status': 'Den vre9hke o student autos' })
})

router.delete('/:id', (req, res) => {
    let student = students.find(x => x.id == req.params.id)
    if (student) {
        students.filter(s => s.id != req.params.id)
        res.json({"message":"User deleted successfully"})
    }
    if (!student) res.json({ 'status': 'Den vre9hke o student autos' })
})


  
  


module.exports = router