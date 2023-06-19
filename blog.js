import Post from './post.js'

class Blog {
    constructor() {
        let form = document.querySelector('#new-post form');
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            let title = form.titulo.value;
            let body = form.body.value;
            let post = new Post(title, body);
            post.save();
            post.render();
            form.reset();
        });
        this.loadPosts2();
    }
    loadPosts() {
        let postsJson = localStorage.getItem('posts');
        let posts = [];
        if (postsJson) {
            posts = JSON.parse(postsJson);
        }
        posts.forEach(post => {
            post = new Post(post.title, post.body,post.id);
            post.render();
        });
    }
    loadPosts2() {
        alert("te  has cargado el programa!")
    }
    loadPosts3() {
        alert("099u0oij0j")
    }

}



new Blog();