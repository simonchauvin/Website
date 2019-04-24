$(".project").find(".thumbnail" ).hover(function() {
    $(this).parent().find(".project-title").toggle();
    $(this).parent().find(".project-subtitle").toggle();
});