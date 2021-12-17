export const addPostToPostcart=(posts,postToAdd)=>{
    const existingPost=posts.find(post=>(
        post.id===postToAdd.id
    ));
    if(existingPost){
        return posts.filter(cartItem=> cartItem.id!==postToAdd.id)
    } else{
        return [...posts,postToAdd]
    }
}