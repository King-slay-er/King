$("document").ready(function(){
    var num1 = parseInt(Math.random()*20+1);
    console.log(num1);
    $(".bg2").addClass("bg"+num1);
    //随机生成的黑色方块长度
    var L = Math.random()*300;
    $(".well-box").addClass("well");
    $(".well").removeClass("well-box");
    $(".well").css("width",L+"px");
    //定义人的位置和树棍的位置
    $(".man").css("left",(L-65)+"px");
    $(".stick").css("left",L+"px");
    //插入黑色方块
    $(".container").append("<div class='well'>");
    var J = Math.random()*300;
    var X = Math.random()*300;
    $(".container div").eq(3).css({"width":J+"px","left":L+"px","margin-left":X+"px"});
    //鼠标移入和移出时按钮的背景图片
    $(".btnClick").hover(
        function(){
            $(this).css("background","url(img/btn-bg.png)");
        },
        function(){
            $(this).css("background","url(img/btn-bg-click.png)");
        }
    );
    //鼠标按住不放事件
    $(".btnClick").mousedown(function(){
        $(".stick").animate({width:"100%"},6000);//树棍宽度增加动画
    });
    //鼠标左键松开事件
    $(".btnClick").mouseup(function(){
        //停止树棍动画
        $(".stick").stop();
        //var cd = $(".stick").style.height;
        //增加样式使树棍倒下
        $(".stick").addClass("stickDown");
        //改变人的图片
        $(".man>img").attr({src:"img/stick.gif"});
        //获取当前的数棍长度
         var cd = $(".stick").width();
        //人的动画开始向右跑
        $(".man>img").animate({left:cd+"px"},2000,function(){
            //屏幕向右移动
            $(".bg2").css("margin-left",L+"px");
            //清楚第一个黑块
            //$(".container div").eq(2).remove("div");
            //第二个黑块的样式
            $(".container div").eq(2).css({"left":"0px","margin-left":"0px"});
            //改变人的图片
            $(".man>img").attr({src:"img/stick_stand.png"});
            //使棍子的长度为0
            $(".stick").width("0px");
            $(".man").css("left",(J-65)+"px");
            $(".man>img,.man").css("left","0");
            //使棍子恢复初始角度
            $(".stick").removeClass("stickDown");
        });
    });
});
