var image = document.createElement("img");
image.crossOrigin = "Anonymous";
const yellow = [60,1.0,0.6];
const purple = 	[313,1.0,0.6];
const colour_of_choice = [249,20,50];
const threshold = 100;
image.src = "https://media.istockphoto.com/photos/modern-living-room-interior-with-air-conditioner-orange-sofa-and-picture-id1352177016?b=1&k=20&m=1352177016&s=170667a&w=0&h=Mec3QGI01I_jI0sBHHZJEW2LSFhbDZQLMg81PHfBp8A=";
image.style.visibility = "hidden";
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight/2;
const colour_to_mon = yellow

function point_diff(point,x,y,z){
    return Math.sqrt((point[0]-x)**2 + (point[1]-y)**2 + (point[2]-z)**2);
}
function onClick(){
   
   
    var r = document.getElementById("r").value;
    if(isNaN(r)||r<0){
        return;
    }
    var g = document.getElementById("g").value;
    if(isNaN(g)||g<0){
        return;
    }
    var b = document.getElementById("b").value;
    if(isNaN(b)||b<0){
        return;
    }
    var sensitivity = document.getElementById("sensitivity").value;
    if(isNaN(sensitivity)||sensitivity<0){
        return;
    }
    r = parseInt(r);
    g = parseInt(g);
    b = parseInt(b);
    sensitivity = parseInt(sensitivity)
    const imgData = ctx.getImageData(0, 0, image.width, image.height);
    extract_colour([r,b,g], image.width,0,ctx,imgData, sensitivity);

}
function extract_colour(col, x, y, ctx, imgData, sensitivity){
    for (i = 0; i < imgData.data.length; i += 4) {
        if(point_diff(col, imgData.data[i],imgData.data[i+1],imgData.data[i+2])<=sensitivity){
            
        }else{
            imgData.data[i] = 0;
            imgData.data[i + 1] =  0;
            imgData.data[i + 2] = 0;
            imgData.data[i + 3] = 255;
        }
        
    }
    ctx.putImageData(imgData, x, y);
}
image.onload = function () {
    ctx.drawImage(image, 0, 0);
    const imgData = ctx.getImageData(0, 0, image.width, image.height);
    extract_colour(colour_of_choice, image.width,0,ctx,imgData, threshold);
};

