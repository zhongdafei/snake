 //小蛇的自调用函数
 (function () {
    var elements = [];//存放小蛇的每个身体部分
    //小蛇的构造函数
    function Snake(width, height, direction) {

        //小蛇的每个部分的宽
        this.width = width || 20;
        this.height = height || 20;
        //小蛇的身体
        this.body = [
            { x: 3, y: 2, color: "red" },//头
            { x: 2, y: 2, color: "orange" },//身体
            { x: 1, y: 2, color: "orange" },//身体
        ];
        //方向
        this.direction = direction || "right";
    }
    //为原型添加方法--小蛇初始化的方法
    Snake.prototype.init = function (map) {
        //先删除之前的小蛇
        remove();
        //循环遍历创建div
        for (var i = 0; i < this.body.length; i++) {
            //数组中的每个数组元素都是一个对象
            var obj = this.body[i];
            //创建div
            var div = document.createElement("div");
            //把div加入map中
            map.appendChild(div);
            //设置div样式
            div.style.position = "absolute";
            div.style.width = this.width + "px";
            div.style.height = this.height + "px";
            div.style.left = obj.x * this.width + "px";
            div.style.top = obj.y * this.height + "px";
            div.style.backgroundColor = obj.color;
            //方向暂时不定

            //把div加入到elements数组中------为了删除小蛇
            elements.push(div);
        }
    };
    //为原型添加方法----小蛇动起来
    Snake.prototype.move = function (food, map) {
        //改变小蛇的身体的坐标位置
        var i = this.body.length - 1;
        for (; i > 0; i--) {
            this.body[i].x = this.body[i - 1].x;
            this.body[i].y = this.body[i - 1].y;
        }
        //判断方向----改变小蛇的头的位置
        switch (this.direction) {
            case "right":
                this.body[0].x += 1;
                break;
            case "left":
                this.body[0].x -= 1;
                break;
            case "top":
                this.body[0].y -= 1;
                break;
            case "bottom":
                this.body[0].y += 1;
                break;
        }
    //判断有没有吃到食物
    //小蛇的头的坐标等于事物的坐标
    var headX=this.body[0].x*this.width;
    var headY=this.body[0].y*this.height;
    if(headX==food.x&&headY==food.y){
        //获取小蛇尾巴
        var last=this.body[this.body.length-1];
        //将蛇尾复制一个
        // 重新加如小蛇的body中
        this.body.push({
            x:last.x,
            y:last.y,
            color:"orange"
        });
        //把食物删除，并初始化食物
        food.init(map);
    }
    }
    //删除小蛇的私有的函数
    function remove() {
        //先获取数组
        var i = elements.length - 1;
        for (; i >= 0; i--) {
            var ele = elements[i];
            ele.parentNode.removeChild(ele);
            elements.splice(i, 1);
        }
    }
    //把snake暴露给window，外部可以访问
    window.Snake = Snake;
}());
