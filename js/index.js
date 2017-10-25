/**
 * Created by jason on 2017/9/12.
 */

function scrolltop()
{
    document.getElementById('scrollmenu').style.top=document.documentElement.scrollTop || document.body.scrollTop || 0;
//兼容写法。页面具有DTD时，使用document.documentElement.scrollTop；没有指定DTD时使用document.body.scrollTop，所以用## || ## || 0 兼容
    timer=setTimeout("scrolltop()",1) //1毫秒调用一次scrolltop()方法
}
$(function () {
    //动画
    $('.hiSlider1').hiSlider({
        isFlexible: true,
        isSupportTouch: true,

        titleAttr: function(curIdx) {
            return $('img', this).attr('alt');
        }
    });

    //置顶
    $("#scrolltop").on("click",function () {

        scrolltop();
    })
    $("#area-list").on("click",function () {
        $("#pro-list").toggle(function () {
            var isVisible = $("#pro-list").is(":visible");
            console.log(isVisible);
            if(isVisible){//显示出了列表项
                var val = $("#area-list .area-input").text();
                var proName = "";
                var rightIcon = $('<span class="iconfont icon-duihao"></span>');

                $("#pro-list li").each(function(index,value) {
                    console.log(name,$(value).text())
                    proName = $(value).text();
                    $(value).find(".iconfont").remove();
                    $(value).removeClass("active");


                });
                $("#pro-list li").each(function(index,value) {
                    console.log(name,$(value).text())
                    proName = $(value).text();

                    if(val == proName){


                        $(value).append(rightIcon);
                        $(value).addClass("active");





                    }


                });






            }
        });



    })

    $("#pro-list li").on("click",function () {
        var val = $(this).text();
        if(val == "全部省份"){
            $("#area-list .area-input").text("全部");
        }else{
            $("#area-list .area-input").text(val);
        }

        $("#pro-list").hide();
    });

    $("#closeRemind").on("click",function () {
        $("#closeRemindWrap").slideUp();
    })







})