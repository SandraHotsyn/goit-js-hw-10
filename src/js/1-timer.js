import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

let userSelectedDate;
let timerInterval;
const dateTimePicker = document.getElementById('datetime-picker');
const startButton = document.querySelector('button[data-start]');
startButton.disabled = true;
const timerFields = document.querySelectorAll('.timer .value');

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateTimer(days, hours, minutes, seconds) {
  timerFields[0].textContent = addLeadingZero(days);
  timerFields[1].textContent = addLeadingZero(hours);
  timerFields[2].textContent = addLeadingZero(minutes);
  timerFields[3].textContent = addLeadingZero(seconds);
}

function convertMs(ms) {
  const second = 1000;
  const minute = 60000;
  const hour = 3600000;
  const day = 86400000;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return [days, hours, minutes, seconds];
}

function countdown() {
  const now = new Date().getTime();
  const timeLeft = userSelectedDate.getTime() - now;
  updateTimer(...convertMs(timeLeft));

  if (timeLeft < 1000) {
    updateTimer(0, 0, 0, 0);
    clearInterval(timerInterval);
    iziToast.success({
      title: 'Success',
    });
    dateTimePicker.disabled = false;
    startButton.disabled = true;
  }
}

function checkDate(selectedDates) {
  userSelectedDate = selectedDates[0];
  const now = new Date().getTime();

  if (userSelectedDate.getTime() < now) {
    iziToast.error({
      title: 'Error',
      message: 'Please choose a date in the future',
    });
    startButton.disabled = true;
  } else {
    const timeLeft = userSelectedDate.getTime() - now;
    updateTimer(...convertMs(timeLeft));
    startButton.disabled = false;
  }
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose: checkDate,
};

flatpickr('#datetime-picker', options);

startButton.addEventListener('click', () => {
  startButton.disabled = true;
  dateTimePicker.disabled = true;
  countdown();
  timerInterval = setInterval(countdown, 1000);
});
