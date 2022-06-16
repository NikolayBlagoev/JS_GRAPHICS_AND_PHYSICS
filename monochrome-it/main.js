var image = document.createElement("img");
image.crossOrigin = "Anonymous";
const yellow = [60,1.0,0.6];
const purple = 	[313,1.0,0.6];
image.src = "https://media.istockphoto.com/photos/modern-living-room-interior-with-air-conditioner-orange-sofa-and-picture-id1352177016?b=1&k=20&m=1352177016&s=170667a&w=0&h=Mec3QGI01I_jI0sBHHZJEW2LSFhbDZQLMg81PHfBp8A=";
image.style.visibility = "hidden";
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const colour_to_mon = yellow

// input: h as an angle in [0,360] and s,l in [0,1] - output: r,g,b in [0,1]
function hsl2rgb(h,s,l) // FUNCTION FROM STACKOVERFLOW : https://stackoverflow.com/questions/2353211/hsl-to-rgb-color-conversion
{
   let a=s*Math.min(l,1-l);
   let f= (n,k=(n+h/30)%12) => l - a*Math.max(Math.min(k-3,9-k,1),-1);
   return [f(0),f(8),f(4)];
}

function mono(col, x, y, ctx, imgData){
    for (i = 0; i < imgData.data.length; i += 4) {
        let count = imgData.data[i] + imgData.data[i + 1] + imgData.data[i + 2];
        let colour = [0,0,0]
       
        colour = hsl2rgb(col[0],col[1],Math.max(0.1,Math.min(0.9,count/(255*3))));
        
        imgData.data[i] = colour[0]*255;
        imgData.data[i + 1] =  colour[1]*255;
        imgData.data[i + 2] = colour[2]*255;
        imgData.data[i + 3] = 255;
    }
    ctx.putImageData(imgData, x, y);
}
image.onload = function () {
    ctx.drawImage(image, 0, 0);
    const imgData = ctx.getImageData(0, 0, image.width, image.height);
    mono(purple, image.width,0,ctx,imgData);
    mono(yellow, 0,image.height,ctx,imgData);
};

