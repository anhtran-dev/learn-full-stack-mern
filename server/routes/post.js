const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));
const Post = require('../models/Post');
const verifyToken = require('../middleware/auth');

// @router POST api/post
// @desc Create post
// @access Private
router.post('/create', verifyToken, async (req, res) => {
    const {title, description, url, status} = req.body;
    // Validation
    if (!title) {
        return res.status(400).send({success: false, message: 'Title is missing '});
    }
    try {
        const newPost = new Post({
            title: title,
            description: description ? description : null,
            url: url && url !== '' ? (url.startsWith('https://') ? url : `https://${url}`) : null,
            status: status || 'To learn',
            user: req.userId
        });
        await newPost.save();
        return res.status(200).send({success: true, message: 'Create post success !', data: newPost})
    } catch (e) {
        return res.status(500).send(e);
    }
});

// @router POST api/post
// @desc Update post
// @access Private
router.post('/update', verifyToken, async (req, res) => {
    const {_id, title, description, url, status} = req.body;
    if (!_id) {
        return res.status(400).send({success: false, message: 'Id is missing '});
    }
    if (!title) {
        return res.status(400).send({success: false, message: 'Title is missing '});
    }
    try {
        let updatedPost = {
            title: title,
            description: description ? description : null,
            url: url && url !== '' ? (url.startsWith('https://') ? url : `https://${url}`) : null,
            status: status || 'To learn',
        };
        const post = await Post.findOneAndUpdate({_id: _id, user: req.userId}, updatedPost, {new: true});
        if(!post){
            return res.status(401).send({success : false, message : 'Post not found !'})
        }
        return res.status(200).send({success: true, message: 'Update post success !', data: post});

    } catch (e) {
        return res.status(500).send(e);
    }
});

// @router GET api/post
// @desc list post
// @access Public
router.get('/list', verifyToken, async (req, res) => {
    try {
        const posts = await Post.find({user: req.userId}).populate('user', ['email']);
        return res.status(200).send({success: true, data: posts});
    } catch (e) {
        return res.status(500).send(e);
    }
});

// @router POST api/post
// @desc delete post
// @access Private
router.post('/delete', verifyToken, async (req, res) => {
    const {_id} = req.body;
    if (!_id) {
        return res.status(400).send({success: false, message: 'Id is missing '});
    }
    try {
        await Post.findOneAndDelete({user: req.userId, _id: _id});
        return res.status(200).send({success: true, message: 'Delete success' ,  data: null});
    } catch (e) {
        return res.status(500).send(e);
    }
});

module.exports = router;
