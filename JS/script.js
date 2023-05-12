const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const playSelect = document.getElementById('play');
const usernameInput = document.getElementById('Username');
const seatPrice = document.getElementById('play').value;

populateUI();
let ticketPrice = +playSelect.value;

function setPlayData(playIndex, playPrice) {
  localStorage.setItem('selectedPlayIndex', playIndex);
  localStorage.setItem('selectedPlayPrice', playPrice);
}

function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
  const selectedSeatsCount = selectedSeats.length;
  count.innerText = selectedSeatsCount;
  ticketPrice = +playSelect.value;
  total.innerText = selectedSeatsCount * ticketPrice;
}


function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }
  const selectedPlayIndex = localStorage.getItem('selectedPlayIndex');
  if (selectedPlayIndex !== null) {
    playSelect.selectedIndex = selectedPlayIndex;
  }
}

playSelect.addEventListener('change', (e) => {
  ticketPrice = +e.target.value;
  setPlayData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

container.addEventListener('click', (e) => {
  if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
    e.target.classList.toggle('selected');
    updateSelectedCount();
  }
});
purchaseButton = document.getElementById('purchaseButton');
container.appendChild(purchaseButton);


purchaseButton.addEventListener('click', () => {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  const selectedSeatsInfo = {
    play: playSelect.options[playSelect.selectedIndex].text,
    seats: [...selectedSeats].map(seat => seat.innerText),
    total: total.innerText,
    numSeats: selectedSeats.length 
  };
  const username = usernameInput.value.trim();
  if (selectedSeats.length === 0) {
    const notification = createNotification('Калі ласка, выберыце месцы.');
    container.appendChild(notification);
  } else if (username === '') {
    const notification = createNotification('Калі ласка, увядзіце ваша імя, каб купіць месцы.');
    container.appendChild(notification);
  } else {
    selectedSeatsInfo.username = username;
    selectedSeatsInfo.cost = selectedSeats.length * ticketPrice;
    const notification = createNotification(`Дзякуй за куплю, ${username}! Дата: ${selectedSeatsInfo.play}. Агульны кошт: ${selectedSeatsInfo.cost} бел.руб.`);
    
    container.appendChild(notification);
  }
});
function createNotification(message) {
  const notification = document.createElement('div');
  notification.classList.add('notification');

  const closeButton = document.createElement('button');
  closeButton.innerHTML = '&times;';
  closeButton.classList.add('close-button');
  closeButton.addEventListener('click', () => {
    notification.remove();
  });

  const notificationText = document.createElement('p');
  notificationText.textContent = message;

  notification.appendChild(closeButton);
  notification.appendChild(notificationText);

  return notification;
}
