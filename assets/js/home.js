function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#USERSIMGDEMO')
                .attr('src', e.target.result)
                .width(100)
                .height(100);
        };

        reader.readAsDataURL(input.files[0]);
    }
}
let toggle = false;

function toggle_commentbox(link) {
    $(link).click((e) => {
        console.log('toggle')
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
for (let link of $('.comment_trigger')) {
    toggle_commentbox($(link))
}
toggle_commentbox('#only_for_Post')
toggle_commentbox('#Post_with_image')