//随机产生位置与数字
function newGame() {
    init();
    generateNum();
    generateNum();
}

//随机位置生成一个随机数字
function generateNum() {
    if(!haveSpace(board)) {
        return false;
    }

    var randX = Math.floor(Math.random()*4);  //随机产生数字出现的位置
    var randY = Math.floor(Math.random()*4);
    while(true) {
        if(board[randX][randY]==0) {
            break;
        }
        randX = Math.floor(Math.random()*4);  //随机产生数字出现的位置
        randY = Math.floor(Math.random()*4);
    }

    var randNum = Math.random()>0.1?2:4;    //随机产生数字2或4
    board[randX][randY] = randNum;
    showNumber(randX,randY,randNum);
    return true;
}

//初始化
function init() {
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            var $theSquare = $("#square"+i+j);
            $theSquare.css("top",getTopPos(i,j));
            $theSquare.css("left",getLeftPos(i,j));
        }
    }
    //初始化board和twiceAdd数组
    for(var i=0;i<4;i++) {
        board[i] = new Array();
        twiceAdd[i] = new Array();
        for(var j=0;j<4;j++) {
            board[i][j] = 0;
            twiceAdd[i][j] = false;
        }
    }

    score = 0;
    updateBoardView();
}

//更新棋盘前端样式
function updateBoardView() {
    $(".demo").remove();
    $("#score").attr("value",score);

    for(var i=0;i<4;i++) {
        for(var j=0;j<4;j++) {
            $("#box").append('<div class="demo" id="demo'+i+''+j+'"></div>');
            var $theDemo = $('#demo'+i+j);
            if(board[i][j]==0) {
                $theDemo.css("width","0px");
                $theDemo.css("height","0px");
                $theDemo.css("left",getLeftPos(i,j));
                $theDemo.css("top",getTopPos(i,j));
            }
            else {
                $theDemo.css("width","100px");
                $theDemo.css("height","100px");
                $theDemo.css("left",getLeftPos(i,j));
                $theDemo.css("top",getTopPos(i,j));
                $theDemo.css("background-color",getBgCol(board[i][j]));
                $theDemo.css("color",getColor(board[i][j]));
                $theDemo.text(board[i][j]);
            }

            twiceAdd[i][j] = false;
        }
    }
}

//得到left值
function getLeftPos(i,j) {
    return 15+j*120;
}
//得到top值
function getTopPos(i,j) {
    return 15+i*120;
}

//得到背景颜色
function getBgCol(num) {
    switch(num) {
        case 2: return '#eee4da';break;
        case 4: return '#eee0c8';break;
        case 8: return '#f2b179';break;
        case 16: return '#f59563';break;
        case 32: return '#f67c5f';break;
        case 64: return '#f65e3b';break;
        case 128: return '#edcf72';break;
        case 256: return '#edcc61';break;
        case 512: return '#9c0';break;
        case 1024: return '#33b5e5';break;
        case 2048: return '#09c';break;
        case 4096: return '#a6c';break;
        case 8192: return '#93c';break;
    }
    return '#000';
}

//得到字体颜色
function getColor(num) {
    if(num>4) {
        return "snow";
    }
    else {
        return "#776e65"
    }
}

//判断棋盘上是否有空间
function haveSpace() {
    for(var i=0;i<4;i++) {
        for(var j=0;j<4;j++) {
            if(board[i][j]==0) {
                return true;
            }
        }
    }
    return false;
}

//随机位置显示数字
function showNumber(i,j,randNum) {
    var $theDemo = $('#demo'+i+j);
    $theDemo.css("background-color",getBgCol(randNum));
    $theDemo.css("color",getColor(randNum));
    $theDemo.text(randNum);

        $theDemo.animate({
            "width":"100px",
            "height":"100px",
            "left":getLeftPos(i,j),
            "top":getTopPos(i,j)
        },50);
}

//格子移动动画
function move(fx,fy,tx,ty) {
    var $theDemo = $("#demo"+fx+fy);
    if(!$theDemo.is(":animated")) {
        $theDemo.animate({"left":getLeftPos(tx,ty),"top":getTopPos(tx,ty)},200);
    }
}

//格子不能移动的条件
function nomove() {
    if(canMoveLeft() || canMoveRight() || canMoveUp() || canMoveDown()) {
        return false;
    }
    else {
        return true;
    }
}

//游戏结束后的提示信息并开始新的游戏
function end() {
    if(once) {
        $("#word").append("对不起，游戏结束！！！");
        $("#btn2").append("退&nbsp;&nbsp;出");
        $("#whole").css("display","block");
        $("#btn2").click(function () {
            newGame();
        });
        once = false;
    }

}

//游戏成功后的信息与游戏失败后的信息
//完成2048后的提示信息，只提示一次。
function gameover() {
    for(var i=0;i<4;i++) {
        for(var j=0;j<4;j++) {
            if(board[i][j] == 2048) {
                if(flag) {
                    $("#word").append("恭喜你完成2048！！！");
                    $("#btn2").append("确&nbsp;&nbsp;定");
                    $("#whole").css("display","block");
                    flag = false;
                    sport = false;
                }
            }
        }
    }
    if(nomove() && !haveSpace()) {
        end();
    }

    $("#btn2").click(function(){
        $("#whole").css("display","none");
        $("#word").html("");
        $("#btn2").html("");
        sport = true;
    })
}



