var board = new Array();
var twiceAdd = new Array();  //判断格子是否合并过的数组
var score = 0;
var flag = true;
var once = true;
var sport = true;

//页面加载开始新游戏以及点击按钮开始新游戏
$(document).ready(function(){
    newGame();

    $("#btn").click(function(){
        newGame();
    });
});

//主要部分的函数
$(document).keydown(function(event){

    if(!sport) {
        if (event.keyCode==37 || event.keyCode==38 || event.keyCode==39 || event.keyCode==40) {
            return false;
        }
    }

    switch(event.keyCode) {
        case 37:
            if(moveLeft()) {
                setTimeout("generateNum()",100);
                    setTimeout("gameover()",400);
            }
            break;
        case 38:
            if(moveUp()) {
                setTimeout("generateNum()",100);
                setTimeout("gameover()",400);
            }
            break;
        case 39:
            if(moveRight()) {
                setTimeout("generateNum()",100);
                setTimeout("gameover()",400);
            }
            break;
        case 40:
            if(moveDown()) {
                setTimeout("generateNum()",100);
                setTimeout("gameover()",400);
            }
            break;
    }
});

//主要的左移函数
function moveLeft() {
    if(!canMoveLeft(board)) {
        return false;
    }

    for(var i=0;i<4;i++) {
        for(var j=1;j<4;j++) {
            if(board[i][j]!=0) {
                for(var k=0;k<j;k++) {
                    if(board[i][k]==0 && noRowBlock(i,k,j,board)) {
                        move(i,j,i,k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if(board[i][k]==board[i][j] && noRowBlock(i,k,j,board) && !twiceAdd[i][k]) {
                        move(i,j,i,k);
                        board[i][k]+=board[i][j];
                        board[i][j] = 0;
                        score += board[i][k];
                        twiceAdd[i][k] = true;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()",200);
    return true;
}

//主要的右移函数
function moveRight() {
    if(!canMoveRight(board)) {
        return false;
    }

    for(var i=0;i<4;i++) {
        for(var j=2;j>=0;j--) {
            if(board[i][j]!=0) {
                for(var k=3;k>j;k--) {
                    if(board[i][k]==0 && noRowBlock(i,j,k,board)) {
                        move(i,j,i,k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if(board[i][k]==board[i][j] && noRowBlock(i,j,k,board) && !twiceAdd[i][k]) {
                        move(i,j,i,k);
                        board[i][k]+=board[i][j];
                        board[i][j] = 0;
                        score += board[i][k];
                        twiceAdd[i][k] = true;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()",200);
    return true;
}

//主要的上移函数
function moveUp() {
    if(!canMoveUp(board)) {
        return false;
    }

    for(var j=0;j<4;j++) {
        for(var i=1;i<4;i++) {
            if(board[i][j]!=0) {
                for(var k=0;k<i;k++) {
                    if(board[k][j]==0 && noColBlock(j,k,i,board)) {
                        move(i,j,k,j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if(board[k][j]==board[i][j] && noColBlock(j,k,i,board) && !twiceAdd[k][j]) {
                        move(i,j,k,j);
                        board[k][j]+=board[i][j];
                        board[i][j] = 0;
                        score += board[k][j];
                        twiceAdd[k][j] = true;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()",200);
    return true;
}

//主要的下移函数
function moveDown() {
    if(!canMoveDown(board)) {
        return false;
    }

    for(var j=0;j<4;j++) {
        for(var i=2;i>=0;i--) {
            if(board[i][j]!=0) {
                for(var k=3;k>i;k--) {
                    if(board[k][j]==0 && noColBlock(j,i,k,board)) {
                        move(i,j,k,j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if(board[k][j]==board[i][j] && noColBlock(j,i,k,board) && !twiceAdd[k][j]) {
                        move(i,j,k,j);
                        board[k][j]+=board[i][j];
                        board[i][j] = 0;
                        score += board[k][j];
                        twiceAdd[k][j] = true;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()",200);
    return true;
}

//判断是否可以左移
function canMoveLeft() {
    for(var i=0;i<4;i++) {
        for(var j=0;j<4;j++) {
            if(board[i][j]!=0&&j!=0) {
                if(board[i][j-1]==0||board[i][j-1]==board[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}

//判断是否可以右移
function canMoveRight() {
    for(var i=0;i<4;i++) {
        for(var j=0;j<4;j++) {
            if(board[i][j]!=0&&j!=3) {
                if(board[i][j+1]==0||board[i][j+1]==board[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}

//判断是否可以上移
function canMoveUp() {
    for(var i=0;i<4;i++) {
        for(var j=0;j<4;j++) {
            if(board[i][j]!=0&&i!=0) {
                if(board[i-1][j]==0||board[i-1][j]==board[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}

//判断是否可以下移
function canMoveDown() {
    for(var i=0;i<4;i++) {
        for(var j=0;j<4;j++) {
            if(board[i][j]!=0&&i!=3) {
                if(board[i+1][j]==0||board[i+1][j]==board[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}

//判断水平方向是否有阻碍
function noRowBlock(row,col1,col2,board) {
    for(var i=col1+1;i<col2;i++) {
        if(board[row][i]!=0) {
            return false;
        }
    }
    return true;
}

//判断垂直方向是否有阻碍
function noColBlock(col,row1,row2,board) {
    for(var i=row1+1;i<row2;i++) {
        if(board[i][col]!=0) {
            return false;
        }
    }
    return true;
}

