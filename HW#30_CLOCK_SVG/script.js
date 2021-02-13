// Total hours on a dial 
const TotalHoursOnDial = 12;
// Total number of degrease in a full cycle
const TotalDegrease = 360;
// Initial vector for numbers on a dial (12 number)
const InitVector = [0, -35];
// Central vector for the dial adjusted per number size 
const CenterVector = [50, 52.5];
// Total amount of seconds per minute
const SecondsPerMinute = 60;
// Total amount of minutes per hour
const MinutesPerHour = 60;

(function init(){
  const svgNS = "http://www.w3.org/2000/svg";
  for(let i = 1; i <= TotalHoursOnDial; i++){
    const newText = document.createElementNS(svgNS,"text");
    const newVector = rotateVector(InitVector, TotalDegrease / TotalHoursOnDial * i);
    newText.setAttributeNS(null,"x", newVector[0] + CenterVector[0]);     
    newText.setAttributeNS(null,"y",newVector[1] + CenterVector[1]);
    const textNode = document.createTextNode(i);
    newText.appendChild(textNode);
    const numbers = document.getElementById('numbers');
    numbers.appendChild(newText);
  }

})();

function rotateVector(vec, ang)
{
    const angRad = ang * (Math.PI/180);
    const cos = Math.cos(angRad);
    const sin = Math.sin(angRad);
    return [
      Math.round(10000*(vec[0] * cos - vec[1] * sin))/10000, 
      Math.round(10000*(vec[0] * sin + vec[1] * cos))/10000,
    ];
};

function setClock() {
    const currentDate = new Date();
    const seconds = currentDate.getSeconds();
    const minutes = currentDate.getMinutes();
    const digitalHours = currentDate.getHours();
    const hours = (currentDate.getHours() % TotalHoursOnDial) + minutes / MinutesPerHour;

    const secondsAngle = TotalDegrease * seconds / SecondsPerMinute;
    const minutesAngle = TotalDegrease * minutes / MinutesPerHour;
    const hoursAngle = TotalDegrease * hours / TotalHoursOnDial;

    const formattedHours = digitalHours < 10 ? '0' + digitalHours : digitalHours;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;

    const time = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    const digitalClock = document.getElementById('digitalClock')
    digitalClock.textContent = time;


    const secondsHand = document.getElementById('secondHand');
    const minutesHand = document.getElementById('minuteHand');
    const hoursHand = document.getElementById('hourHand');


    secondsHand.setAttribute('transform', 'rotate(' + secondsAngle + ',50,50)');
    minutesHand.setAttribute('transform', 'rotate(' + minutesAngle + ',50,50)');
    hoursHand.setAttribute('transform', 'rotate(' + hoursAngle + ',50,50)');

    setTimeout(setClock, 1000);
  }

  setClock()