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

    $('.hiSlider1').hiSlider({
        isFlexible: true,
        isSupportTouch: true,

        titleAttr: function(curIdx) {
            return $('img', this).attr('alt');
        }
    });


    $("#scrolltop").on("click",function () {
        console.log(124);
        scrolltop();
    })

    setTimeout(function () {
        $("#white-line").height(function () {
            var height = $(window).height();
            return height;
        })
    },600)



})