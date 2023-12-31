import { PostComments } from "./home_comments.js";
import { ToggleLike } from "./toggle_likes.js";
{   //------------------------------------------------------------------------------------------
    
    let pc=function(c){
        new PostComments(c);
    }
    // method to submit the form data for new post using AJAX
    let createPost = function(){
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function(data){
                    let newPost = newPostDom(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost);
                    deletePost($(' .delete-post-button', newPost));

                    // call the create comment class
                   // console.log(data.data.post._id)
                   console.log(PostComments)
                   // new PostComments(data.data.post._id);
                   pc(data.data.post._id);

                    new ToggleLike($(' .toggle-like-button', newPost));
                    new Noty({
                        theme: 'relax',
                        text: "Post published!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();

                }, error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }


    // method to create a post in DOM
    let newPostDom = function(post){
        return $(`<li id="post-${post._id}" type="none" class="post-li">
                    <div class="home-post">
                        <div class="home-post-delete">
                        
                        
                            <a class="delete-post-button"  href="/posts/destroy/${ post._id }"><h3><i class="fa-solid fa-xmark" style="color: #dadadc;"></i></h3></a>
                        
                            </div>
                            <div class="home-post-data">
                            <p class="home-post-content">
                            ${ post.content }
                            </p>
                        
                        <p class="home-post-name">
                        ${ post.user.name }
                        </p>
                        
                        
                        
                        
                        </div>
                        <div class="home-post-like">
                                <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${post._id}&type=Post">
                                    <h3>0 <i class="fa-solid fa-thumbs-up" style="color: #dadadc;"></i></h3>
                                </a>
                            
                                </div>             
                                </div>
                    
                    <div class="post-comments">
                        
                            <form id="post-${ post._id }-comments-form" action="/comments/create" method="POST">
                                <input type="text" name="content" placeholder="Type Here to add comment..." required>
                                <input type="hidden" name="post" value="${ post._id }" >
                                <input type="submit" value="Add Comment">
                            </form>
               
                
                        <div class="post-comments-list">
                            <ul id="post-comments-${ post._id }">
                                
                            </ul>
                        </div>
                    </div>
                    
                </li>`)
    }


    // method to delete a post from DOM
    let deletePost = function(deleteLink){
        //console.log(deleteLink)
        
        $(deleteLink).click(function(e){
            console.log('e',e)
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#post-${data.data.post_id}`).remove();
                    new Noty({
                        theme: 'relax',
                        text: "Post Deleted",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                },error: function(error){
                    console.log(error.responseText);
                }
            });

        });
    }



//     let convertPostsToAjax = function(){
//         $('#posts-list-container>ul>li').each(function(){
//             let self = $(this);
//            //console.log(self)
//             let deleteButton = $(' .delete-post-button', self);
//            // console.log(deleteButton)
//             deletePost(deleteButton);

//            let postId = self.prop('id').split("-")[1];
//            console.log(postId)
//            new PostComments(postId);
//         })
//     }

//     convertPostsToAjax ()
   
//    createPost();



let convertPostsToAjax = function(){
    $('#posts-list-container>ul>li').each(function(){
        let self = $(this);
        let deleteButton = $(' .delete-post-button', self);
        deletePost(deleteButton);

        // get the post's id by splitting the id attribute
        let postId = self.prop('id').split("-")[1]
        pc(postId )
        
    });
}

createPost();
convertPostsToAjax();

}