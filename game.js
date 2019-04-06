 //自调用函数----游戏对象
 ((function () {
    var that = null;
    //游戏的构造函数
    function Game(map) {
        this.food = new Food();
        this.snake = new Snake();
        this.map = map;
        that = this;
    }
    //初始化游戏-----可以使小蛇和食物显示出来
    Game.prototype.init = function () {
        //初始化游戏
        //食物初始化
        this.food.init(this.map);
        //小蛇初始化
        this.snake.init(this.map);
        //调用自动移动小蛇的方法
        this.runSnake(this.food, this.map);
        //调用按键的方法
        this.bindKey();

        // setInterval(function(){
        //     that.snake.move(that.food,that.map) ;
        //     that.snake.init(that.map);
        // },150);

    }
    
    //添加原型方法-----设置小蛇可以自动的跑起来
    Game.prototype.runSnake = function (food, map) {
        var timeId = setInterval(function () {
            //移动小蛇
            //此时的小蛇就是window
            this.snake.move(food, map);
            //初始化小蛇
            this.snake.init(map);
            //横坐标的最大值
            var maxX = map.offsetWidth / this.snake.width;
            //纵坐标的最大值
            var maxY = map.offsetHeight / this.snake.height;
            //小蛇的头的坐标
            var headX = this.snake.body[0].x;
            var headY = this.snake.body[0].y;
            if (headX < 0 || headX >= maxX) {
                //撞墙了,停止定时器
                clearInterval(timeId);
                alert("游戏结束");
            }
            if (headY < 0 || headY >= maxY) {
                //撞墙了,停止定时器
                clearInterval(timeId);
                alert("游戏结束");
            }
        }.bind(that), 150);
    };
  
    //添加原型方法-----设置用户按键，改变小蛇移动方向
   Game.prototype.bindKey=function(){
       //获取用户按键，改变小蛇方向
       document.addEventListener("keydown",function(e){
            switch(e.keyCode){
                case 37:this.snake.direction="left";break;
                case 39:this.snake.direction="right";break;
                case 38:this.snake.direction="top";break;
                case 40:this.snake.direction="bottom";break;
            }
       }.bind(that),false);
   }
    window.Game = Game;
})());
