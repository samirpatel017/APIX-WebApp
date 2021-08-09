$('document').ready(() => {
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
    for (let link of $('#trigger')) {
        toggle_commentbox($(link))
    }
})