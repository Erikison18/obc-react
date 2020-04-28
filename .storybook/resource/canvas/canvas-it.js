var canvas_dom = document.getElementById('painter');
var ctx = canvas_dom.getContext('2d');

//获取鼠标的位置
function Ball(r,angle){
    this.angle = angle;
    this.r = r;
    this.x = r*Math.cos(angle);
    this.y = r*Math.sin(angle);
};
Ball.prototype = {
    getR:function(){
        return this.r;
    },
    setR:function(r){
        this.r = r;
    },
    getAngle:function(){
      return this.angle;
    },
    setAngle:function(angle){
        this.angle = angle;
    },
    getX:function(){
        return this.x;
    },
    getY:function(){
        return this.y;
    },
    getXY:function(){
        return {
            x:this.x,
            y:this.y
        }
    },
    setX:function(x){
        this.x = x;
    },
    setY:function(y){
        this.y = y;
    },
    setXY:function(x,y){
        this.x = x;
        this.y = y;
    }
};
//设置圆球位置
var timer;
var step = Math.PI/88;
var length = Math.PI/180;//每个Ball
var balls = [1,2,3,4,5,6,7,8,9,10].map(function(val,index){
    return new Ball(val*10,index*10)
});
var colors = [
    "#F44336","#EF9A9A","#C2185B","#9C27B0",
    "#2196F3","#90CAF9","#5C6BC0","#536DFE",
    "#673AB7","#B388FF","#03A9F4","#00BCD4",
    "#00897B","#CDDC39","#76FF03","#FFD54F"
];//16位
var endCX = Math.random()*200+100;
var endCY = Math.random()*200+150;
var cx = endCX;
var cy = endCY;
render();
document.body.onmousemove= function(e){
    endCX = e.pageX;
    endCY= e.pageY;
};
function render(){
    ctx.fillStyle = "rgba(0,0,0,0.1)";
    ctx.fillRect(0,0,canvas_dom.width,canvas_dom.height);
    for(var i=0;i<balls.length;i++){
        var b_x = balls[i].getX(),
            b_y = balls[i].getY(),
            b_r = balls[i].getR(),
            b_angle = balls[i].getAngle();
        ctx.save();
        ctx.lineWidth = 2;

        var random = 400;
        var dx = (endCX - cx)/random,
            dy = (endCY - cy)/random;

        cx += dx;cy += dy;
        ctx.translate(cx,cy);

       //Math.floor(Math.random()*16)
        ctx.fillStyle = colors[i];
        ctx.beginPath();
        ctx.arc(b_x,b_y,5,0,2*Math.PI,false);

        ctx.closePath();
        ctx.fill();
        ctx.restore();
        balls[i].setXY(
            b_x*Math.cos(step)-b_y*Math.sin(step),
            b_x*Math.sin(step)+b_y*Math.cos(step)
        );

    }
    timer = requestAnimationFrame(render);
}