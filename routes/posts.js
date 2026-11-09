import express from 'express';
import commentsRouter from './comments.js'

const router = express.Router();
router.use('/:postId/comments', commentsRouter);

export const posts = [{ id: 1, title: 'Hello World' }];
export const comments = { 1: [] };

router.get('/', (req, res) => {
    res.json(posts); 
});

router.get('/:postId', (req, res) => {
    const post = posts.find(p => p.id === parseInt(req.params.postId));
    if(!post){
        res.status(404).json({msg: 'Post not found'})
    } 
    else{
        res.json(post);
    }
});

export default router;

