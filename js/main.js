var currentSection = null;
var currentProject = null;
var currentVideoUrl = null;

var url = window.location.href;
var startUrlPos = url.search('#project-');
if (startUrlPos > 0)
{
    showProject(url.substr(startUrlPos, url.length - startUrlPos));
}

$('.project-thumbnail-img').find('a').click(
    function(){
        //location.href = "#home";
    }
);

$(".project-thumbnail").hover(
    function(){
        $(this).find(".project-thumbnail-title").css("visibility", "visible");
        
        $(this).find(".project-thumbnail-img img").css({opacity: 0.2});
        $(this).find(".project-thumbnail-img img").css({filter: 'alpha(opacity=20)'});
    },
    function(){
        $(this).find(".project-thumbnail-title").css("visibility", "hidden");
        
        $(this).find(".project-thumbnail-img img").css({opacity: 1});
        $(this).find(".project-thumbnail-img img").css({filter: 'alpha(opacity=100)'});
    }
);

$('#projects').find('.project-thumbnail').click(
    function(){ 
        showProject($(this).find("a").attr("href"));
        
        return false; 
    }
);

function showProject(projectId) {
    currentSection = $('#projects');
    
    currentSection.find('.project-thumbnail').hide();
    
    if ($(projectId).parent().hasClass('project-in-progress'))
    {
        currentSection.find('#sub-section-recent').hide();
        currentSection.find('#sub-section-earlier').hide();
    }
    else if ($(projectId).parent().hasClass('project-recent'))
    {
        currentSection.find('#sub-section-in-progress').hide();
        currentSection.find('#sub-section-earlier').hide();
    }
    else if ($(projectId).parent().hasClass('project-earlier'))
    {
        currentSection.find('#sub-section-in-progress').hide();
        currentSection.find('#sub-section-recent').hide();
    }
    
    if ($(projectId).find('.project-video'))
    {
        currentVideoUrl = $(projectId).find('.project-video').attr('src');
    }
    
    currentProject = projectId;
    
    location.href = currentProject;
    
    $(currentProject).show();
}

$('.back-to-projects').click(function(){ 
    if (currentVideoUrl)
    {
        $(currentProject).find('.project-video').attr('src', '');
        $(currentProject).find('.project-video').attr('src', currentVideoUrl);
        
        currentVideoUrl = null;
    }
    
    $(currentProject).hide();
    
    $(currentSection).find('.project-thumbnail').show();
    currentSection.find('.sub-section').show();
    
    location.href = "#";
    
    currentSection = null;
    currentProject = null;
    
    return false;
});