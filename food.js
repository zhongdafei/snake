  //食物的自调用函数
  (function () {
    //用来保存每个小方块事物的
    var elements = [];
    function Food(x, y, width, height, color) {
        this.x = x || 0;
        this.y = y || 0;
        this.width = width || 20;
        this.height = height || 20;
        this.color = color || "green";
    }

    Food.prototype.init = function (map) {
        //先删除这个小食物
        remove();
        //创建div
        var div = document.createElement("div");
        //把div加到map中
        map.appendChild(div);
        //设置div样式
        div.style.width = this.width + "px";
        div.style.height = this.height + "px";
        div.style.backgroundColor = this.color;
        //横纵坐标默认为0，所以不能设置
        //先脱离文档流
        div.style.position = "absolute";
        //随机横纵坐标
        this.x = parseInt(Math.random() * (map.offsetWidth / this.width)) * this.width;
        this.y = parseInt(Math.random() * (map.offsetHeight / this.height)) * this.height;
        div.style.left = this.x + "px";
        div.style.top = this.y + "px";

        //吧div加入到数组中element
        elements.push(div);
    }
    //私有的函数
    function remove() {
        //elements数组中有这个食物
        for (var i = 0; i < elements.length; i++) {
            var ele = elements[i];
            ele.parentNode.removeChild(ele);
            //再次将elements中的子元素删除
            elements.splice(i, 1);
        }
    }
    window.Food = Food;
}());
