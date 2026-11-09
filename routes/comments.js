import express, { text } from 'express';
import {posts, comments} from './posts.js';
 
const router = express.Router({mergeParams: true});

router.use((req, res, next) =>{
    const post = posts.find(p => p.id === parseInt(req.params.postId));
    if(!post){
        res.status(404).json({msg: 'Post not found'});
    }
    else{
        next();
    }
});

router.get('/', (req, res)=>{
    const postId = req.params.postId;
    const postComments = comments[postId] || [];
    res.json(postComments);
})

router.post('/', (req, res) => {
    const postId = req.params.postId;
    
    if(!comments[postId]){
        comments[postId] = [];
    }

    const newComment = {
        id: comments[postId].length + 1,
        text: req.body.text
    };

    comments[postId].push(newComment);
    res.status(201).json(newComment);
});

export default router;


