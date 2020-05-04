var currentSection = null;
var currentProject = null;
var currentVideoUrl = null;

var url = null;
var startUrlPos = null;


$(document).ready(function(){
    url = window.location.href;
    startUrlPos = url.search('#project-');

    if (startUrlPos > 0)
    {
        var project = $(url.substr(startUrlPos, url.length - startUrlPos));

        hideSection(project.parents(".section"));
        showProject(project);
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

$('.project-thumbnail').click(function(){ // Click on thumbnail
    var scrollTop = $(window).scrollTop();

    if (currentProject != null)
    {
        hideCurrentProject();
        showSection();
    }

    hideSection($(this).parents(".section"));

    showProject($($(this).find("a").attr("href")));

    resetScrollPosition(scrollTop);
    
    return false;
});

$('.previous-project').click(function(){ // Click on prev
    var scrollTop = $(window).scrollTop();

    hideCurrentProject();

    var prevProjects = $(this).parents('.project-container').prevAll('.project-container');
    if (prevProjects.length > 0)
    {
        showProject(prevProjects.first());
    }
    else
    {
        showProject($(this).parents('.project-container').nextAll('.project-container').last());
    }

    resetScrollPosition(scrollTop);
    
    return false;
});

$('.back-to-projects').click(function(){ // Click on back
    var scrollTop = $(window).scrollTop();

    hideCurrentProject();

    showSection();

    resetScrollPosition(scrollTop);
    
    return false;
});

$('.next-project').click(function(){ // Click on next
    var scrollTop = $(window).scrollTop();

    hideCurrentProject();

    var nextProjects = $(this).parents('.project-container').nextAll('.project-container');
    if (nextProjects.length > 0)
    {
        showProject(nextProjects.first());
    }
    else
    {
        showProject($(this).parents('.project-container').prevAll('.project-container').last());
    }

    resetScrollPosition(scrollTop);
    
    return false;
});

function resetScrollPosition(scrollTop) // Used to prevent resetting of position when changing location.href
{
    $(window).scrollTop(scrollTop);
}

function showSection()
{
    currentSection.find('.project-thumbnail').show();
    currentSection = null;
}

function hideSection(section)
{
    currentSection = section;
    currentSection.find('.project-thumbnail').hide();
}

function showProject(projectElem) {
    currentProject = projectElem;
    
    if (currentProject.find('.project-video'))
    {
        currentVideoUrl = currentProject.find('.project-video').attr('src');
    }

    currentProject.show();

    location.href = "#" + currentProject.attr("id");
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
    currentProject = null;
    
    location.href = "#";
}