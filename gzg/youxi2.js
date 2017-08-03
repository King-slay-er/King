
$(document).ready(function(){
    //柱子
    var weWidth = 100;
    //设置柱子的宽为100px，不加单位是为了更好的加减
    function initWell(){
        //生成固定的柱子
        $(".well-box").append('<div class="well" style="left:0px; width:'+weWidth+'px"></div>');
        //第二根柱子
        //最大值不能超过container距离顶部的距离
        var max = $(".container").offset().top;
        //最小值自己随意取
        var min = 80;
        //第二根柱子的left值
                  //柱子的宽度        第二根柱子距离第一柱子之间的距离
        var end2 = weWidth + parseInt(Math.random()*(max-min))+min;
        $(".well-box").append('<div class="well" style="left:'+end2+'px; width:'+weWidth+'px"></div>');
        //第三根柱子的left值
        var end3 =end2 + weWidth + parseInt(Math.random()*(max-min))+min;
        $(".well-box").append('<div class="well" style="left:'+end3+'px; width:'+weWidth+'px"></div>');
        //屏幕的宽度
        var pmk = window.screen.width;
        //第四根柱子距离第三根柱子的最大值
        var Left2 = pmk -end3 -3*weWidth-min;
        //如果这个距离大于max
        if(Left2>=max){
            var end4 =end3 + weWidth + parseInt(Math.random()*(max-min))+min;
        }else{
            var end4 =end3 + weWidth + parseInt(Math.random()*(Left2-min))+min;
        }
        $(".well-box").append('<div class="well" style="left:'+end4+'px; width:'+weWidth+'px"></div>');
        //alert(pmk);
        //第五根柱子离第四根柱子的最大距离
        var leFt = pmk -end4-weWidth-weWidth;
        var end5 =end4 + weWidth + parseInt(Math.random()*(leFt-min))+min;
        $(".well-box").append('<div class="well" style="left:'+end5+'px; width:'+weWidth+'px"></div>');
        //四根柱子都要在视线范围内

    }
    initWell();
    //鼠标放在按钮上和移出按钮时
    $(".btnClick").hover(
        function(){
            $(this).css("background","url(img/btn-bg.png)");
        },
        function(){
            $(this).css("background","url(img/btn-bg-click.png)");
        }
    );
    //定义变量stop让棍子只能伸长一次
    var stop = true;
                    //鼠标按住不放
    $(".btnClick").mousedown(function(){
        if(stop == true){
            var stickH = $(".container").offset().top;
            $(".stick").animate({"width":stickH+"px"},3000);//棍子宽度增加动画
        }
    });
    //鼠标松开
    $(".btnClick").mouseup(function(){
        if(stop == true){
            $(".stick").stop();//棍子宽度增加动画停止
            stop = false;
            $(".stick").addClass("stickDown");
            moveRen();
        }
    });
    //小人跑起来
    //获取柱子的变量,也是小人在第几个柱子上的变量
    var num = 0;
    var guanQia = 1;
    function moveRen() {
        //获取棍子的宽
        var stickW = $(".stick").width();
        //让小人在混子倒下后过半秒再开始跑动
        setTimeout(function(){
            //改变小人的src路径
            $(".man img").attr("src", "img/stick.gif");
            //小人向右跑起来
            $(".man img").animate({"left": stickW},1000,function(){
                var juLi = $(".well").eq(num+1).offset().left-weWidth;
                if(stickW<juLi || stickW>(juLi+weWidth)){
                    shiBai();
                }else{
                    //小人换成站立的图片并隐藏起来
                    $(".man img").attr("src", "img/stick_stand.png").hide();
                    //棍子初始化
                    $(".stick").removeClass("stickDown").width("0px");
                    //柱子往左移动的距离
                    var next = $(".well").eq(num+1).css("left");
                    $(".well-box").animate({"left":"-"+next},1000,function(){
                        $(".man img").show();
                        $(".man img").css("left","0px");
                        stop = true;
                        num++;
                        if(num == 4){
                            stop = false;
                            chenGong();
                        }
                    });
                }
            });
        },500);
    }
    //挑战失败时
    function shiBai(){
        //小人掉下来
        $(".man img").addClass("rotate").hide(1000);
        //小人掉下来之后过0.6秒棍子消失恢复初始状态
        setTimeout(function(){
            //棍子初始化
            $(".stick").removeClass("stickDown").width("0px");
            //提示框出来
            $(".dialog").show();
            //给提示文本加内容
            $(".name").html(shiBaiSZ[parseInt(Math.random()*20)+1]);
            //再试一次按钮
            $(".dialog-btn").html('<a href="javascript:void(0);" class="play-agin">再试一次</a>');
            $(".play-agin").live("click",function(){
                suaXin();
                $(".man img").show();
            });
        },600);

    }
    //挑战成功时
    function chenGong(){
        //小人换成站立的图片
        $(".man img").attr("src", "img/stick_stand.png");
        //提示框显示出来
        $(".dialog").show();
        //提示框里添加文本内容
        $(".name").html(chenGongSZ[parseInt(Math.random()*20)+1]);
        //给提示框加两个按钮 -重玩一次- -下一关-
        $(".dialog-btn").html('<a href="javascript:void(0);" class="play-agin">重玩一次</a><a href="javascript:void();" class="xyg">下一关</a>');
    }
    //点击按钮刷新页面
    $(".play-agin").live("click",function() {
        suaXin();
    });
    $(".xyg").live("click",function(){
        suaXin();
        guanQia = guanQia+1;
        $(".play-title").html("关卡"+guanQia);
    });
    //定义失败的文本数组
    var shiBaiSZ = [
        '志在峰巅的攀登者，不会陶醉在沿途的某个脚印之中。',
        '海浪为劈风斩浪的航船饯行，为随波逐流的轻舟送葬。',
        '人生最重要的一点是，永远不要迷失自己。',
        '一个人承受孤独的能力有多大，他的能力就有多大。',
        '实力塑造性格，性格决定命运。',
        '普通人成功并非靠天赋，而是靠把寻常的天资发挥到不寻常的高度。',
        '对于强者，要关注他们的灵魂，对于弱者，他关注他们的生存。',
        '积极的人在每一次忧患中都看到一个机会，而消极的人则在每个机会都看到某种忧患。',
        '成功不是将来才有的，而是从决定去做的那一刻起，持续累积而成。',
        '当你感到悲哀痛苦时，最好是去学些什么东西。学习会使你永远立于不败之地。',
        '有的人一生默默无闻，有的人一生轰轰烈烈，甚至千古流芳，为什么会这样？因为默默无闻的人只是满足于现状，而不去想怎么轰轰烈烈过一生，不要求自己，去做，去行动，怎么能够成功？',
        '人性最可怜的就是：我们总是梦想着天边的一座奇妙的玫瑰园，而不去欣赏今天就开在我们窗口的玫瑰。',
        '在人生的道路上，即使一切都失去了，只要一息尚存，你就没有丝毫理由绝望。因为失去的一切，又可能在新的层次上复得。',
        '没有一劳永逸的开始；也没有无法拯救的结束。人生中，你需要把握的是：该开始的，要义无反顾地开始；该结束的，就干净利落地结束。',
        '生命的奖赏远在旅途终点，而非起点附近。我不知道要走多少步才能达到目标，踏上第一千步的时候，仍然可能遭到失败。但我不会因此放弃，我会坚持不懈，直至成功！',
        '不要认为只要付出就一定会有回报，这是错误的。学会有效地工作，这是经营自己强项的重要课程。',
        '苦心人天不负，卧薪尝胆，三千越甲可吞吴。有志者事竞成，破釜沉舟，百二秦川终属楚。',
        '生命本身是一个过程，成功与失败只是人生过程中一些小小的片段，若果把生命与成功或失败联系在一起，生命将失去本身该有的意义。',
        '我们不要哀叹生活的不幸，诅咒命运的不公。在命运面前，我们要做强者，掐住命运的咽喉，叩问命运，改变命运。',
        '努力和效果之间，永远有这样一段距离。成功和失败的唯一区别是，你能不能坚持挺过这段无法估计的距离。'
    ];
    //设置放成功的提示文本数组
    var chenGongSZ = [
        '勇敢坚毅真正之才智乃刚毅之志向。 —— 拿破仑',
        '志向不过是记忆的奴隶，生气勃勃地降生，但却很难成长。 —— 莎士比亚',
        '骏马是跑出来的，强兵是打出来的。',
        '只有登上山顶，才能看到那边的风光。',
        '如果惧怕前面跌宕的山岩，生命就永远只能是死水一潭。',
        '平时没有跑发卫千米，占时就难以进行一百米的冲刺。',
        '梯子的梯阶从来不是用来搁脚的，它只是让人们的脚放上一段时间，以便让别一只脚能够再往上登。',
        '没有激流就称不上勇进，没有山峰则谈不上攀登。',
        '真正的才智是刚毅的志向。 —— 拿破仑',
        '山路曲折盘旋，但毕竟朝着顶峰延伸。',
        '只有创造，才是真正的享受，只有拚搏，才是充实的生活。',
        '敢于向黑暗宣战的人，心里必须充满光明。',
        '种子牢记着雨滴献身的叮嘱，增强了冒尖的勇气。',
        '自然界没有风风雨雨，大地就不会春华秋实。',
        '只会幻想而不行动的人，永远也体会不到收获果实时的喜悦。',
        '勤奋是你生命的密码，能译出你一部壮丽的史诗。',
        '对于攀登者来说，失掉往昔的足迹并不可惜，迷失了继续前时的方向却很危险。',
        '奋斗者在汗水汇集的江河里，将事业之舟驶到了理想的彼岸。',
        '忙于采集的蜜蜂，无暇在人前高谈阔论。',
        '勇士搏出惊涛骇流而不沉沦，懦夫在风平浪静也会溺水。'
    ];
    function suaXin(){
        //隐藏对话框
        $(".dialog").hide();
        $(".well-box").empty("well");
        //柱子初始化
        initWell();
        //棍子初始化
        stop = true;
        $(".stick").removeClass("stickDown").width("0px");
        //小人初始化
        $(".man").find("img").attr("src","img/stick_stand.png").css("left","0px").removeClass("rotate");
        //柱子盒子初始化
        $(".well-box").css("left","0px");
        //小人在第几根柱子初始化
        num = 0;
        //背景初始化
        var suiJi= parseInt(Math.random()*20+1);
        $(".bg2").addClass("bg"+suiJi);
    }
});
