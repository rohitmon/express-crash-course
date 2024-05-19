const output = document.querySelector('#output');
const button = document.querySelector('#get-posts-btn');
const addButton = document.querySelector('#add-posts-btn');


async function showPosts(){

    try {
        const res = await fetch('http://localhost:8080/api/posts');
        if(!res.ok){
            throw new Error('Something went wrong');
        }

        const posts = await res.json();
        output.innerHTML = '';
        posts.forEach(post => {
            const postEl = document.createElement('div');
            postEl.textContent = post.title;
            output.appendChild(postEl);
        })
    } catch (error) {
        console.log('Error fetching posts: ' + error.message);
    }
    
}

async function addPost(e) {
    e.preventDefault();
    const formData = new FormData(this);
    const title = formData.get('title');
    console.log(title);
    try {
        const res = await fetch('http://localhost:8080/api/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title})
        })

        if(!res.ok){
            throw new Error('Something went wrong');
        }

        const newPost = await res.json();
        const postEl = document.createElement('div');
        postEl.textContent = newPost.title;
        output.appendChild(postEl);
        showPosts();
    } catch (error) {
        console.error('Error adding post');
    }
}

button.addEventListener('click', showPosts);
addButton.addEventListener('submit', addPost);