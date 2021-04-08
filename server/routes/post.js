const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));
const Post = require('../models/Post');

// @router POST api/post
// @desc Create post
// @access Private

router.post('/create', async (req, res) => {
    const {title , description , url , status} = req.body;
    // Validation
    if(!title){
        return res.status(400).send({success : false , message : 'Title is missing '});
    }
    try{
        const newPost = new Post({
           title,
           description,
           url : (url.startWith('https://') ? url : `https://${url}`),
           status :  status || 'To Learn',
           user : '606ec487a155310928719406'
        });
        await newPost.save();
        console.log('newPost', newPost)
        return res.status(200).send({success : true, message : 'Create post success !', data : newPost})
    }catch (e) {
        return res.status(500).send(e);
    }
});

module.exports = router;
