import posts from "../data/posts.js";

// @desc Get all posts
// @route GET /api/posts
export const getPosts = (req, res) => {
    const limit = parseInt(req.query.limit);
    if (!isNaN(limit) && limit > 0){
        return res.status(200).json(posts.slice(0, limit));
    } 
    
    res.status(200).json(posts);
}

// @desc Get a specific post
// @route GET /api/posts/:id
export const getPostById = (req, res, next) => {
    const id = parseInt(req.params.id);
    const post = posts.find(post => post.id === id);
    if(!post) {
        const error = new Error(`A post with id ${id} was not found`)
        error.status = 404;
        return next(error);
    } 
    
    res.status(200).json(posts);
}

// @desc Create a post
// @route POST /api/posts
export const createPost = (req, res, next) => {
    const id = posts.length + 1;
    const title = req.body.title;
    if(!title) {
        const error = new Error(`Please include a title`)
        error.status = 400;
        return next(error);
    }
    const post = {id, title};
    posts.push(post);
    res.status(201).json(posts);
}


export const updatePost = (req, res, next) => {
    const id = parseInt(req.params.id);
    const post = posts.find(post => post.id === id);
    if(!post) {
        const error = new Error(`A post with id ${id} was not found`)
        error.status = 404;
        return next(error);
    } 
    const title = req.body.title;
    if(!title) {
        const error = new Error(`Please include a title`)
        error.status = 400;
        return next(error);
    }
    post.title = title;
    res.status(200).json(posts);
}

export const deletePost = (req, res, next) => {
    const id = parseInt(req.params.id);
    const post = posts.find(post => post.id === id);
    if(!post) {
        const error = new Error(`A post with id ${id} was not found`)
        error.status = 404;
        return next(error);
    } 
    posts = posts.filter(post => post.id!== id);
    res.status(200).json(posts);
}