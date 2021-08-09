{
    $('document').ready(() => {

        let toggle = false;

        function toggle_commentbox(link) {
            $(link).click((e) => {
                
                if (toggle == true) {
                    $($(link).data("target")).addClass("d-none");
                    toggle = false;
                }
                else {
                    $($(link).data("target")).removeClass("d-none");
                    toggle = true;
                }

            })
        }
        for (let link of $('.trigger')) {
            toggle_commentbox($(link))
        }
        // toggle_commentbox('#only_for_Post')
        // toggle_commentbox('#Post_with_image')
        
        //met6hod of creating a post in ajax request

        let createPost = () => {
            let newPost = $('#post_form');
            newPost.on('submit', (e) => {
                e.preventDefault();

                $.ajax({
                    url: '/post/create',
                    method: 'POST',
                    data: newPost.serialize(),
                    success: function (data) {
                        let newPostData = newPostDom(data.data.post);
                        console.log(data.data.post)
                        $('#notes_post').prepend(newPostData);
                        deletePost($(' .delete_post_button', newPostData));

                        $(".comment_form1").addClass("comment_form");
                        new ToggleLike($(`#like-${data.data.post._id}`, newPostData));
                        
                        for (let link of $('.trigger')) {
                            toggle_commentbox($(link))
                        }
                        callNotysuccess('Posted Successfully !');
                        new PostComments(data.data.post._id);
                        convertPostsToAjax()
                    },
                    error: function (error) {
                        console.log(error.responseText);
                        callNotyErr('Error In posting ! Please try after some time');

                    }
                });
                $("#post_form")[0].reset();
            });
        }

        //met6hod of creating a post in ajax request


        //html of ajax post 

        let newPostDom = (post) => {
            return $(`
        <div id="post_${post._id}" class="card my-3 d-block mx-auto" style="  width: 70%!important";>
            <div class="card-body">
                <div class="card-header d-flex justify-content-between ">
                    <div class="user_img d-flex">
                        <img src="${post.user.avatar}" alt="${post.user.name}" class="img-circle">
                        <div class=" d-flex flex-column mx-3">
                            <h5 class="">${(post.user.name).charAt(0).toUpperCase() + (post.user.name).slice(1)}</h5>
                            <sub class="text-muted">${moment(post.createdAt).fromNow().charAt(0).toUpperCase() + moment(post.createdAt).fromNow().slice(1)}</sub>  
                        </div>
                    </div>
                
                    <a class="delete_post_button" href="/post/destroy/${post._id}">
                        <h5 class="text-right"><i class="fas fa-trash"></i></h5>
                    </a>
                    
                </div>
               
                ${post.post_img != null ?
                    `<img src="${post.post_img}" class="card-img-top" alt="..."> `
                    : ''
                }   
                <div class="d-flex">
                    <div>
                        <i class="fas fa-comments mr-4  mt-4 fa-lg"></i> 
                    </div>
                    <div>
                        <h5 class="card-text mt-3" style="white-space: pre-line">${post.content}</h5>
                    </div>
               
                </div>
                <br>  
                <a href="/like/toggle/?id=${post._id}&type=Post" id="like-${post._id}" class="like-buttons"
                data-toggle="false" data-likes="0"><i class="far fa-heart"></i> <span>0</span></a>
                &nbsp&nbsp&nbsp
                <button class="trigger " style="background-color: transparent;" data-target="#comment_hide_comment_${post._id}"><i class="far fa-comment"></i></button>

                   <hr>
            
            </div>
            <div class="container-fluid d-none" id="comment_hide_comment_${post._id}"  >
                <div class="row bootstrap snippets bootdeys">
                    <div class="col" id="#card">
                        <div class="comment-wrapper">
                            <div class="card border-0">
                                <div class="card-body">
                                  
                                    <form class="comment_form1" id="comment_form-${post._id}"  action="/comment/create_comment" method="POST">
                                        <div class="input-group mb-3">
                                            <input type="text" class="form-control" placeholder="comment .."
                                                aria-label="comment .." name="comment_content"
                                                aria-describedby="button-addon2" required>
                                            <input type="hidden" name="post" value="${post._id}">
    
                                            <div class="input-group-append">
                                                <button class="btn" type="submit" id="button-addon2"><svg
                                                        xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                                        width="35" height="35" viewBox="0 0 172 172"
                                                        style=" fill:#000000; margin-top:-7px">
                                                        <g fill="none" fill-rule="nonzero" stroke="none"
                                                            stroke-width="1" stroke-linecap="butt"
                                                            stroke-linejoin="miter" stroke-miterlimit="10"
                                                            stroke-dasharray="" stroke-dashoffset="0"
                                                            font-family="none" font-weight="none" font-size="none"
                                                            text-anchor="none" style="mix-blend-mode: normal">
                                                            <path d="M0,172v-172h172v172z" fill="none"></path>
                                                            <g fill="#302f2f">
                                                                <path
                                                                    d="M28.66667,17.2c-3.16643,0 -5.73333,2.5669 -5.73333,5.73333c0.00121,0.51864 0.07278,1.03472 0.21276,1.53411c0.0037,0.01121 0.00743,0.02241 0.0112,0.03359l5.50938,38.56563l-17.2,11.46667l120.4,11.46667l-120.4,11.46667l17.2,11.46667l-5.50938,38.57683c-0.14579,0.50609 -0.22115,1.02985 -0.22396,1.55651c0,3.16643 2.5669,5.73333 5.73333,5.73333c0.76223,-0.00413 1.51599,-0.16021 2.21719,-0.45911l0.0112,0.0112l0.24635,-0.12317l0.12318,-0.05599c0.03378,-0.01833 0.06738,-0.03699 0.10078,-0.05599l125.67422,-62.83151l0.0112,-0.02239c2.10882,-0.90013 3.47854,-2.97014 3.48255,-5.26302c-0.00144,-2.29965 -1.37681,-4.37592 -3.49375,-5.27422c0,-0.00373 0,-0.00746 0,-0.0112h-0.0112l-125.61823,-62.80911c-0.16728,-0.09443 -0.3392,-0.18038 -0.5151,-0.25755c-0.70546,-0.29652 -1.46314,-0.44882 -2.22839,-0.44792z">
                                                                </path>
                                                            </g>
                                                        </g>
                                                </svg></button>
                                            </div>
                                        </div>
                                    </form>
        
                                    <hr>
                                        <ul class="media-list" id="post-comment-${post._id}">
                                      
                                        </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>`);
        }

        //method of deleting a post in ajax request


        let deletePost = (deleteLink) => {
            $(deleteLink).click((e) => {
                e.preventDefault();
                if (confirm("Are you sure ! You want to delete this ?")) {
                    $.ajax({
                        method: 'get',
                        url: $(deleteLink).prop('href'),
                        success: (data) => {
                            console.log(data);
                            $(`#post_${data.data.post_id}`).remove();
                            callNotysuccess('Deleted Successfully !');
                        },
                        error: function (error) {
                            callNotyErr('Error In deleting ! Please try after some time');
                            console.log(error.responseText);
                        }
                    });
                }
            });
        }

        //delete all xisting post dimnamicaly

        let apply_dynamic_delete_to_existing_posts = function () {
            for (let link of $('.delete_post_button')) {
                deletePost(link);
            }
            
        }
        //delete all existing post dimnamicaly

        apply_dynamic_delete_to_existing_posts();
        let convertPostsToAjax = function () {
            $('.post_list_container').each(function () {
                let self = $(this);
                // get the post's id by splitting the id attribute
                let postId = self.prop('id').split("-")[1]
                new PostComments(postId);
            });
            $('.comment_form').each(function (e) {
                let self = $(this);
                let postId = self.prop('id').split("-")[1]

                new PostComments(postId);
                // new PostComments(self)

            });
            $('.delete_comment_button').each(function (e) {
                let self = $(this);
                let z = new PostComments();
                z.deleteComment(self)
                // new PostComments(self)

            });
        }

        callNotysuccess = (text) => {
            new Noty({
                theme: 'relax',
                text: text,
                type: 'success',
                layout: 'topRight',
                timeout: 3000
            }).show();
        }
        callNotyErr = (text) => {
            new Noty({
                theme: 'relax',
                text: text,
                type: 'error',
                layout: 'topRight',
                timeout: 3000
            }).show();
        }

        convertPostsToAjax()
        createPost();


    });
}


