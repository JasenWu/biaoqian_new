/**
 * Created by jason on 2017/9/12.
 */

function scrolltop()
{
    document.getElementById('scrollmenu').style.top=document.documentElement.scrollTop || document.body.scrollTop || 0;
//兼容写法。页面具有DTD时，使用document.documentElement.scrollTop；没有指定DTD时使用document.body.scrollTop，所以用## || ## || 0 兼容
    timer=setTimeout("scrolltop()",1) //1毫秒调用一次scrolltop()方法
}
function startTel(tels, mid)
     {
   if(typeof(tels) == 'string')
   {

   }
   else
   {
    var html_list = '<div class="modal-bg-self"  id="startTelBg"></div><div class="phone-list" id="startTelContent"><ul class="phones">';

    for(var i =0;i<tels.length;i++)
    {
     html_list+= '<li><a onClick="addUserContact(' + mid + ',' + tels[i] + ')" href=" '+tels[i]+'">'+tels[i]+'</a ></li>';
    }
    html_list += '</ul><div class="cancel" id="cancel">取消</div></div>';
      }
      $("body").append(html_list);
      var bg = $("#startTelBg");
      var content = $("#startTelContent");
      var cancel = $("#cancel");

      bg.show();
      content.show();
      cancel.on("click",function(){
     bg.remove();
     content.remove();
    });
   }


//
//
// function startTel(tels) {
//
//   console.log(typeof(tels));
//   if(typeof(tels) == 'string'){
//     console.log("create single");
//   }else{
//       console.log("create more");
//
//       var html_list = '<div class="modal-bg-self"  id="startTelBg"></div><div class="phone-list" id="startTelContent"><ul class="phones">';
//
//       for(var i =0;i<tels.length;i++){
//         html_list+= '<li><a href="tel:'+tels[i]+'">'+tels[i]+'</a></li>';
//       }
//
//       html_list += '</ul><div class="cancel" id="cancel">取消</div></div>';
//
//       console.log(html_list);
//   }
//   $("body").append(html_list);
//   var bg = $("#startTelBg");
//   var content = $("#startTelContent");
//   var cancel = $("#cancel");
//
//   bg.show();
//   content.show();
//   cancel.on("click",function(){
//     bg.remove();
//     content.remove();
//   })
// }

/*
 方法名称：uploadIcon
 功能描述：上传文件时候判断是否是图片格式
 */
function uploadIcon(targetId, sourceId) {
    function getFileUrl(sourceId) {
        var url;
        if (navigator.userAgent.indexOf("MSIE") >= 1) { // IE
            if (!!document.getElementById(sourceId).value) {
                url = document.getElementById(sourceId).value;
            } else {
                url = this.defaultImgSrc;
            }
        } else { // Firefox
            if (!!document.getElementById(sourceId).files.item(0)) {
                url = window.URL.createObjectURL(document.getElementById(sourceId).files.item(0));
            } else {
                url = this.defaultImgSrc;
            }
        }
        return url;
    }
    //判断大小和格式
    var file = document.getElementById(sourceId).files.item(0);
    if (!!file) {
        if (file.type != 'image/jpeg' && file.type != 'image/gif' && file.type != 'image/png') { //300Kb是上限
            alert("只支持jpg、jpeg、png、gif、bmp格式的文件");
            document.getElementById(sourceId).value  =  "";
            return;
        }
        console.log("filesize", file.size);
        if (file.size > 1000 * 1000) { //300Kb是上限
            alert("图片必须小于300KB");
            document.getElementById(sourceId).value  =  "";
            return;
        }
    }
    var url = getFileUrl(sourceId);
    var imgPre = document.getElementById(targetId);
    imgPre.src = url;
}
$(function () {
    // //动画
    // $('.hiSlider1').hiSlider({
    //     isFlexible: true,
    //     isSupportTouch: true,
    //
    //     titleAttr: function(curIdx) {
    //         return $('img', this).attr('alt');
    //     }
    // });

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

    //上传文件
    $("#imageFileUpload").on("change",function () {
        console.log("12233");
        uploadIcon('imgPre','imageFileUpload');
    })

    $("#role_list .btn").on("click",function(){
      console.log("this class",$(this).attr('class'));
      var __this = $(this);
      var _curClass = __this.attr('class');
      if(_curClass.indexOf("btn-outline-primary") == -1){
        __this.siblings(".btn").removeClass("btn-outline-primary").addClass("btn-outline-dark");//移掉黑色
        __this.removeClass("btn-outline-dark").addClass("btn-outline-primary");
      }
    })






})
