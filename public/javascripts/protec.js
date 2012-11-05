var original_sidebar_width = 0;
var original_content_width = 0;

function setup_dom() {
    var zoom = $("#zoom").val();
    $(".handle").draggable(
        {
            axis: "x",
            containment: "parent",
            grid: [ Math.pow(2, zoom), 10 ],
            stop: function(event, ui) {
                issue_moved(this);
            }
        }
    );


    $(".task_todo").resizable(
        {
            handles: "e, w",
            grid: [ Math.pow(2, zoom), 10 ],
            minWidth: [ Math.pow(2, zoom), 10 ],
            start: function(event, ui) {
                $(this).siblings().hide();
            },
            stop: function(event, ui) {
                issue_resized(this);
            }
        }
    );
}

function issue_resized(i_el) {
    el = $(i_el);

    pel = el.parent();
    pel_dom = pel.get(0);

    el_left = el.position().left;
    pel_left = pel_dom.style.left;

    pel.css("left", parseInt(pel_left) + parseInt(el_left));
    el.css("left", "auto");
    pel.width(el.width() + 100);

    issue_moved(pel.get(0));
}

function setup_events() {
    $("#toggle-sidebar").click(function() {
        if ($(this).hasClass("hide")) {
            if (original_sidebar_width == 0) {
                original_sidebar_width = $("#sidebar").css('width');
            }
            if (original_content_width == 0) {
                original_content_width = $("#content").css('width');
            }
            $(this).removeClass("hide");
            $("#sidebar").width(10);
            $("#sidebar-content").hide();
            $("#content").width("97%");
            $(this).html("&laquo;");
        } else {
            $(this).addClass("hide");
            $("#sidebar").width(original_sidebar_width);
            $("#sidebar-content").show();
            $("#content").width(original_content_width);
            $(this).html("&raquo;");
        }
    });
}
$(document).ready(setup_dom);
$(document).ready(setup_events);
