// Total hours on dial
const TotalHours = 12;
// Minutes in an hour
const MinutesInHour = 60;
// Seconds in a minute
const SecondsInMinute = 60;
// Total number of degrees in a circle
const TotalDegrees = 360;

(function init(){
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const canvasCenter = canvas.height / 2;
    ctx.translate(canvasCenter, canvasCenter);
    const faceRadius = canvasCenter * 0.65;

    setInterval(drawClock, 1000, ctx, faceRadius);
})()


function drawClock(ctx, faceRadius){
    drawFace(ctx, faceRadius);
    drawNumbers(ctx, faceRadius);
    drawTime(ctx, faceRadius);
}

function drawFace(ctx, faceRadius){
    ctx.beginPath();
    ctx.arc(0, 0, faceRadius, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.beginPath();
    ctx.arc(0, 0, faceRadius * 0.05, 0, 2 * Math.PI);
    ctx.fillStyle = '#333';
    ctx.fill();
}

function fractionToRadians(degrees){
    return TotalDegrees * degrees * Math.PI / 180;
}

function drawNumbers(ctx, faceRadius) {
    ctx.font = faceRadius * 0.15 + 'px Raleway';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    for(let num = 1; num <= TotalHours; num++){
      const angle = fractionToRadians(num / TotalHours);
      ctx.rotate(angle);
      ctx.translate(0, -faceRadius * 0.85);
      ctx.rotate(-angle);
      ctx.fillText(num.toString(), 0, 0);
      ctx.rotate(angle);
      ctx.translate(0, faceRadius * 0.85);
      ctx.rotate(-angle);
    }
}

function drawTime(ctx, faceRadius){
    const currentTime = new Date();
    const hour = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const seconds = currentTime.getSeconds();

    const formattedHours = hour < 10 ? "0" + hour : hour;
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    const formattedSeconds = seconds < 10 ? "0" + seconds : seconds;
    const digitalTime = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;

    // set analog clock
    // hour
    const hours = hour % TotalHours;
    const oneHourAngle = fractionToRadians(1 / TotalHours);
    const hourHandAngle = (hours * oneHourAngle) + (minutes * oneHourAngle / MinutesInHour) + (seconds * oneHourAngle / MinutesInHour / SecondsInMinute); 
    drawHand(ctx, hourHandAngle, faceRadius * 0.6, faceRadius * 0.065, 'black');
    // minute
    const minuteHandAngle = fractionToRadians(minutes / MinutesInHour) + fractionToRadians(seconds / SecondsInMinute / MinutesInHour);
    drawHand(ctx, minuteHandAngle, faceRadius * 0.7, faceRadius * 0.05, 'black');
    // second
    const timeSeconds = fractionToRadians(seconds / SecondsInMinute);
    drawHand(ctx, timeSeconds, faceRadius * 0.85, faceRadius * 0.01, 'red');

    // set digital clock
    drawDigitalClock(ctx, digitalTime, -faceRadius * 0.4);
}

function drawHand(ctx, pos, length, width, color) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = 'round';
    ctx.strokeStyle = color;
    ctx.moveTo(0,0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
}

function drawDigitalClock(ctx, digitalTime, faceRadius){
    ctx.font = faceRadius * 0.15 + 'px Raleway';
    ctx.fillText(digitalTime, 0, faceRadius);
}

