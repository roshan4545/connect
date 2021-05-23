let mongoose = require('mongoose')
let express = require('express');
let router = express.Router();

let posts = require('../models/post-schema')
let user = require('../models/user-schema')
// router.route('/hello').post((req,res,next) => {
//     posts.find((error,data) => {
//         if (error) {
//             return next(error)
//         } else {
//             res.json(data)
//         }
//     })
// })

router.route('/createpost').post((req, res,next) => {

    const reqtitle = req.body.title;
    const reqcategories = req.body.categories;
    const reqcontent = req.body.content;
    // const authorId = user._id;
    // const authorName = user.firstName + " " + user.lastName;
    const reqtime = Date.now();


    console.log(reqtitle,reqcategories)

    posts.create({
        title: reqtitle,
        categories: reqcategories,
        content: reqcontent,
        time: reqtime
    }, (err,data) => {
        if(err){
            return next(err)
        }
        else{
            res.json(data)
        }
    })



    });
router.route('/post').get((req, res,next) => {
    posts.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            console.log(data)
            res.json(data)
        }
    })
})

router.route('/users').get((req, res) => {
    user.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            console.log(data)
            res.json(data)
        }
    })
})

module.exports = router;