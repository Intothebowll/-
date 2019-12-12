/**
 * Created by 吴思民 on 2019/12/10.
 */
$(function(){


    //后台拿到一组轮播图的数据
    var rotationPhotoData = [
        "images/lunbo_1.jpg",
        "images/lunbo_2.jpg",
        "images/lunbo_3.jpg",
    ];
    var $allRotationPhoto = $(".rotationPhoto");
    var $mainPictureSon = $(".mainPicture ul");
    var $smallCircle = $(".smallCircle");
    var $smallCircleSon = $(".smallCircle ul");
    var index = 0;
    var timeout;


    //生成元素的方法
    function rotationPhoto(wImg,hImg){
        $(rotationPhotoData).each(function(index,rotationPhotoItemData) {
            //mainPicture的模板
            $mainPictureSon.append(
                `<li><a href=""><img src="${rotationPhotoItemData}" alt=""
                style="width:${wImg}px;height:${hImg}px;position:absolute;"></a></li>`
            );
            $smallCircleSon.append(
                `<li class="smallCircle-item"></li>`
            );
        });

        //定义生成的元素的样式
        $allRotationPhoto.css({
            width:wImg+"px",
            height:hImg+"px"
        });
        $smallCircle.css({
            width:$(rotationPhotoData).length*14+"px"
        });

        //初始化元素
        var $mainPictureSonLi =  $(".mainPicture li");
        var $smallCircleSonLi =  $(".smallCircle li");
        $mainPictureSonLi.eq(0).children().children().css("zIndex","4").siblings("img").css("zIndex","3");
        $mainPictureSonLi.eq(0).siblings("li").children().children().css("zIndex","3");
        $smallCircleSonLi.eq(0).addClass("smallCircle-itemCurrent").siblings("li").removeClass("smallCircle-itemCurrent");

        //定义动作函数
        function move(){
            $mainPictureSonLi.eq(index).children().children().css("zIndex","4").siblings("img").css("zIndex","3");
            $mainPictureSonLi.eq(index).siblings("li").children().children().css("zIndex","3");
            $smallCircleSonLi.eq(index).addClass("smallCircle-itemCurrent").siblings("li").removeClass("smallCircle-itemCurrent");
        }

        //定义轮播图函数
        function autoPhoto(){
            timeout = setInterval(function(){
                index++;
                if(index > $mainPictureSonLi.length-1){
                    index = 0;
                }
                move();
                console.log(index+"pppppp");

            },1000);
        }
        autoPhoto();

        $smallCircleSonLi.mouseenter(function(){
            clearInterval(timeout);
            index = $(this).index();
            console.log(index);
            move();
        }).mouseleave(function(){
            autoPhoto();
        })


        var pre = $(".left");
        var next = $(".right");
        pre.mouseup(function(){
            index--;
            if(index<0){
                index = $mainPictureSonLi.length-1;
            }
            move();
        });
        next.click(function(){
            index++;
            if(index > $mainPictureSonLi.length-1){
                index = 0;
            }
            move();
        });
        pre.mouseenter(function () {
            clearInterval(timeout);
        }).mouseleave(function () {
            autoPhoto();
        });
        next.mouseenter(function () {
            clearInterval(timeout);
        }).mouseleave(function () {
            autoPhoto();
        });
    }
    rotationPhoto(800,300);

})