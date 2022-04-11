
const apiUrl = 'https://adg-rec-task.herokuapp.com';

async function fetchPosts(){
    try{
    const response = await fetch("https://adg-rec-task.herokuapp.com");
    
    if(!response.ok){
        throw new Error(`Failed to fetch posts : ${response.status}`);
    }

    return await response.json();
    }catch(e){
        console.log(e);
    }
}

function listsPosts(postContainerElementId){
    const postContainerElement = document.getElementById(postContainerElementId);
    
    if(!postContainerElementId){
        return;
    }

    fetchPosts()
    .then(posts =>{
        if(!posts){
            postContainerElement.innerHTML = "no posts fetched.";
            return;
        }

        for (const post of posts){
            postContainerElement.appendChild(postElement(post));
        }

    })
    .catch(e=>{
        console.log(e);
    });
}

function postElement(post){
    const anchorElement =document.createElement('a');
    anchorElement.setAttribute('href',`${apiUrl}/getBlog/${post.id}`);
    anchorElement.setAttribute('target','_blank');
    anchorElement.innerText = post.title;
   
    const postTitleElement = document.createElement('h3');
    postTitleElement.appendChild(anchorElement);

    return postTitleElement;

}
