
class Post {
    static postCount = 0;

    constructor(title,body,id=null){
        if(id){
            Post.postCount = id;
        }
        this.id = Post.postCount++;
        this.title = title;
        this.body = body;
        this.article = document.createElement('article');
        this.article.id = this.id;
        this.article.classList.add('post');
        document.getElementById('blog').appendChild(this.article);
    }
    render(){

        this.article.innerHTML = '';
        let title = document.createElement('h2'); // creamos un elemento h2
        title.textContent = this.title;

        let body = document.createElement('p'); // creamos un elemento p
        body.textContent = this.body;
        
        let editButton = document.createElement('button');
        editButton.textContent = 'Editar';

        let deleteButton = document.createElement('button');
        deleteButton.textContent = 'Borrar';

        this.article.appendChild(title);
        this.article.appendChild(body);
        this.article.appendChild(editButton);
        this.article.appendChild(deleteButton);

        editButton.addEventListener('click',()=>{
            this.renderEdit();
        });
        
        deleteButton.addEventListener('click',()=>{
            this.delete();
        });

    }
    renderEdit(){
        this.article.innerHTML = '';
        let title = document.createElement('input'); // creamos un elemento h2
        title.value = this.title;

        let body = document.createElement('input'); // creamos un elemento p
        body.value = this.body;
        
        let saveButton = document.createElement('button');
        saveButton.textContent = 'Guardar';

        let cancelButton = document.createElement('button');
        cancelButton.textContent = 'Cancelar';

        this.article.appendChild(title);
        this.article.appendChild(body);
        this.article.appendChild(cancelButton);
        this.article.appendChild(saveButton);

        saveButton.addEventListener('click',()=>{
            this.title = title.value;
            this.body = body.value;
            this.save();
            this.render();
        });
        cancelButton.addEventListener('click',()=>{
            this.render();
        });

    }
    delete(){
        this.deleteHtml();
        this.deleteFromStorage();
    }
    deleteHtml(){
        this.article.remove();
    }
    deleteFromStorage(){
        let postsJson = localStorage.getItem('posts');
        if(!postsJson){
            return;
        }
        let posts = JSON.parse(postsJson);
        posts = posts.filter(post => post.id !== this.id);
        localStorage.setItem('posts',JSON.stringify(posts));
    }
    save(){
        this.saveToStorage();
    }
    saveToStorage(){
        let postsJson = localStorage.getItem('posts');
        let posts = [];
        if(postsJson){
            posts = JSON.parse(postsJson);
        }
        let post = {
            id: this.id,
            title: this.title,
            body: this.body
        }
        let index = posts.findIndex(element => element.id === this.id);
        if(index !== -1){
            posts[index] = post;
        }else{
            posts.push(post);
        }
        localStorage.setItem('posts',JSON.stringify(posts));
    }

    
}

export default Post;