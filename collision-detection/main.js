//BY NIKOLAY BLAGOEV
const sleep = time => new Promise(res => setTimeout(res, time, "")); //FUNCTION FROM STACKOVERFLOW
const yellow = [0.17,1.0,0.5];
const purple = 	[0.87,1.0,0.65];
var canvas = document.getElementById("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext("2d");
var mouseX = 0;
var mouseY = 0;
function update(e){
    mouseX =e.clientX;
    mouseY = e.clientY;
}
canvas.onmousemove = update;

var objects = [];
var walls = [];
var floor = {
    x: 0,
    y: 930,
    x_size: canvas. width,
    y_size: 40
};
var wall_l = {
    x: 0,
    y: 0,
    x_size: 20,
    y_size: canvas.height
};
var wall_r = {
    x: canvas.width-20,
    y: 0,
    x_size: 20,
    y_size: canvas.height
};

var ball1={
    x: 800,
    y: 200,
    radius: 50,
    mass: 10,
    vel_x: 0,
    vel_y: 0,
    terminal_vel: 10,
    a_x: 0,
    a_y: 0.5,
    force_x: 0,
    force_y: 5,
    elasticity: 0.9

};

var ball2={
    x: 1200,
    y: 200,
    radius: 10,
    mass: 1,
    vel_x: 0,
    vel_y: 0,
    terminal_vel: 10,
    a_x: 0,
    a_y: 0.5,
    force_x: 0,
    force_y: 5,
    elasticity: 0.6

};



walls.push(floor)
walls.push(wall_l)
walls.push(wall_r)
// [ mass , ]
objects.push(ball1)
objects.push(ball2)
function distance(x0, y0, x1, y1, x2, y2){

    return Math.abs((x2-x1)*(y1-y0)-(x1-x0)*(y2-y1))/Math.sqrt((x2-x1)**2+(y2-y1)**2)
}
function collide(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "hsl("+ Math.floor(360*yellow[0])+","+ Math.floor(100*yellow[1])+"%,"+ Math.floor(100*yellow[2])+"%)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "hsl("+ Math.floor(360*purple[0])+","+ Math.floor(100*purple[1])+"%,"+ Math.floor(100*purple[2])+"%)";
    for(const wall of walls){
        ctx.fillRect(wall.x, wall.y, wall.x_size, wall.y_size)
    }
    for(const o of objects){
        var vel = Math.sqrt(o.vel_x**2+o.vel_y**2);
        var compensation = 0;
        o.a_y = 0.25;
        for(const wall of walls){
            const d1 = distance(o.x,o.y,wall.x,wall.y,wall.x+wall.x_size,wall.y);
            
            const d2 = distance(o.x,o.y,wall.x,wall.y,wall.x,wall.y+wall.y_size);
            const d3 = distance(o.x,o.y,wall.x,wall.y+wall.y_size,wall.x+wall.x_size,wall.y+wall.y_size);
            const d4 = distance(o.x,o.y,wall.x+wall.x_size,wall.y,wall.x+wall.x_size,wall.y+wall.y_size);
            var vel_to_consider = 0;
            if(vel>0){
                vel_to_consider = Math.abs(vel)
            }
            if(d1<=o.radius+vel_to_consider){
                o.a_y = 0.0;
                var t = d1/vel;
                
                o.vel_y = -o.vel_y*o.elasticity;
                if(d1>o.radius && vel_to_consider!=0){
                    compensation+= o.vel_y/Math.abs(vel_to_consider/(Math.max(0,d1-o.radius)));
                }
            }else if(d2<=o.radius+vel_to_consider){
                o.a_y = 0.0;
                o.vel_y = -o.vel_y*o.elasticity;
                if(d2>o.radius && vel_to_consider!=0){
                    compensation+= o.vel_y/Math.abs(vel_to_consider/(Math.max(0,d2-o.radius)));
                }
            }else if(d3<=o.radius+vel_to_consider){
                o.a_y = 0.0;
                o.vel_y = -o.vel_y*o.elasticity;
                if(d3>o.radius && vel_to_consider!=0){
                    compensation+= o.vel_y/Math.abs(vel_to_consider/(Math.max(0,d3-o.radius)));
                }
            }else if(d4<=o.radius+vel_to_consider){
                o.a_y = 0.0;
                o.vel_y = -o.vel_y*o.elasticity;
                if(d4>o.radius && vel_to_consider!=0){
                    compensation+= o.vel_y/Math.abs(vel_to_consider/(Math.max(0,d4-o.radius)));
                }
            }
        }
        console.log(compensation)
        o.y = o.y + o.vel_y;
        o.x = o.x + o.vel_x;
        o.vel_y = o.vel_y + o.a_y;
        o.vel_x = o.vel_x + o.a_x;
        
        
        
        ctx.beginPath();
        ctx.arc(o.x, o.y, o.radius, 0, 2 * Math.PI);
        ctx.fill();
    }
       
}

window.onresize = ()=>{
    //collide()
    // canvas.width = window.innerWidth;
    // canvas.height = window.innerHeight;
    // let fnt_size = 200+Math.floor((canvas.width-1920)/10);
    // console.log(fnt_size)
    // ball_size = 20+Math.floor((canvas.width-1920)/100);
    // ctx.font = fnt_size+"px Impact";
};
setInterval(collide,10);