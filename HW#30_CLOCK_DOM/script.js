// Total hours on dial
const TotalHours = 12;
// Minutes in an hour
const MinutesInHour = 60;
// Seconds in a minute
const SecondsInMinute = 60;
// Total number of degrees in a circle
const TotalDegrees = 360;
// 

// render DOM
const container = document.createElement('div');
container.className = 'clockContainer';
document.body.appendChild(container);

const clock = document.createElement('div');
clock.className = 'clock';
container.appendChild(clock);

    for(let i = 1; i <= TotalHours; i ++){
    const number = document.createElement('div');
    number.style.setProperty('--rotation', `${i * TotalDegrees / TotalHours}deg`);
    number.className = 'number';
    number.innerHTML = [i];
    clock.appendChild(number);
};

const hour = document.createElement('div');
hour.className = 'hand' + ' ' + 'hour';
clock.appendChild(hour);

const minute = document.createElement('div');
minute.className = 'hand' + ' ' + 'minute';
clock.appendChild(minute);

const second = document.createElement('div');
second.className = 'hand' + ' ' + 'second';
clock.appendChild(second);

const digitalClock = document.createElement('div');
digitalClock.className = 'digital';
clock.appendChild(digitalClock);

// set clock

setInterval(setClock, 1000)

const hourHand = document.querySelector('.hour')
const minuteHand = document.querySelector('.minute')
const secondHand = document.querySelector('.second')

function setClock() {
  const currentDate = new Date();
  const seconds = currentDate.getSeconds();
  const minutes = currentDate.getUTCMinutes();
  const hours = currentDate.getHours();

  // set digital clock

  const formattedHours = hours < 10 ? "0" + hours : hours;
  const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
  const formattedSeconds = seconds < 10 ? "0" + seconds : seconds;

  const time = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  digitalClock.innerText = time;


  // set analog clock

  const secondsRatio = seconds / SecondsInMinute
  const minutesRatio = (secondsRatio + minutes) / MinutesInHour
  const hoursRatio = (minutesRatio + hours) / TotalHours
  setRotation(secondHand, secondsRatio)
  setRotation(minuteHand, minutesRatio)
  setRotation(hourHand, hoursRatio)
}

function setRotation(element, rotationRatio) {
  element.style.setProperty('--rotation', rotationRatio * TotalDegrees)
}

setClock()

