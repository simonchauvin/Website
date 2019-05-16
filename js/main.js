var currentProjectsContainer = null;
var currentProject = null;
var currentVideoUrl = null;

var url = null;
var startUrlPos = null;


$(document).ready(function(){
    url = window.location.href;
    startUrlPos = url.search('#project-');

    if (startUrlPos > 0)
    {
        showProject(url.substr(startUrlPos, url.length - startUrlPos));
    }

});


$(".project-thumbnail").hover(function(){
    $(this).find(".project-thumbnail-title").css("visibility", "visible");
    
    $(this).find(".project-thumbnail-img img").css({opacity: 0.2});
    $(this).find(".project-thumbnail-img img").css({filter: 'alpha(opacity=20)'});
}, function(){
    $(this).find(".project-thumbnail-title").css("visibility", "hidden");
    
    $(this).find(".project-thumbnail-img img").css({opacity: 1});
    $(this).find(".project-thumbnail-img img").css({filter: 'alpha(opacity=100)'});
});

$('.project-thumbnail').click(function(){
    if (currentProject != null)
    {
        hideCurrentProject();
    }

    showProject($(this).find("a").attr("href"));
    
    return false; 
});

function showProject(projectId) {
    currentProject = $(projectId);
    currentProjectsContainer = currentProject.closest('.projects-container');
    
    currentProjectsContainer.find('.project-thumbnail').hide();
    
    if (currentProject.find('.project-video'))
    {
        currentVideoUrl = currentProject.find('.project-video').attr('src');
    }

    currentProject.show();

    var scrollTop = $(window).scrollTop();
    location.href = projectId;
    $(window).scrollTop(scrollTop);
}

function hideCurrentProject()
{
    if (currentVideoUrl)
    {
        currentProject.find('.project-video').attr('src', '');
        currentProject.find('.project-video').attr('src', currentVideoUrl);
        
        currentVideoUrl = null;
    }
    
    currentProject.hide();
    currentProjectsContainer.find('.project-thumbnail').show();

    currentProjectsContainer = null;
    currentProject = null;
    
    var scrollTop = $(window).scrollTop();
    location.href = "#home";
    $(window).scrollTop(scrollTop);
}

$('.back-to-projects').click(function(){ 
    hideCurrentProject();
    
    return false;
});