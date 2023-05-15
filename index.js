$(function(){
    $('.left-toggle').hover(function(){
        $('#boxx').css("width","880px");
        $('#container-left').css("width","62%");
        $('#container-right').css("width","38%");
        $('.radio-btn').css("animation-play-state","running");
        $('.left-title').css("animation-play-state","running");
        $('.search-result').css("animation-play-state","running");
        $('#slide').css("padding","0 20px");
        $('#slide').css("border","1px solid #fff");
    });

    var radioValue = "all";
    $(function(){
        $(".radio-btn").click(function(){
            setTimeout(getRadioValue, 1);
            setTimeout(searchquery, 1);

        });
    });
    function getRadioValue(){
        radioValue = $(".radio-btn.active input").val();
    }

    $("#search-text").on("keyup", function() {
        searchquery();
    });
    function searchquery(){
        var sq = $('#search-text').val().toLowerCase();
        $(".result-info").each(function() {
            var n = $(this).children(".result-name").text().toLowerCase();
            var d = $(this).children(".result-department").text().toLowerCase();
            if(n.indexOf(sq) !== -1 && (radioValue === d || radioValue === "all"))
                $(this).closest('.result').css("display","block");
            else
                $(this).closest('.result').css("display","none");
        });
    }
});