const express = require('express');
const router = express.Router();

let posts = [];

// Create a new post
router.post('/', (req, res) => {
    const { title, content } = req.body;
    const post = { id: posts.length + 1, title, content };
    posts.push(post);
    res.status(201).json(post);
});

// Get all posts
router.get('/', (req, res) => {
    res.json(posts);
});

// Get a single post
router.get('/:id', (req, res) => {
    const post = posts.find(p => p.id === parseInt(req.params.id));
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
});

// Update a post
router.put('/:id', (req, res) => {
    const post = posts.find(p => p.id === parseInt(req.params.id));
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const { title, content } = req.body;
    post.title = title;
    post.content = content;

    res.json(post);
});

// Delete a post
router.delete('/:id', (req, res) => {
    posts = posts.filter(p => p.id !== parseInt(req.params.id));
    res.status(204).send();
});

module.exports = router;
