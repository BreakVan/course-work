const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
const purchaseButton = document.createElement('button');
const usernameInput = document.getElementById('Username');

populateUI();
let ticketPrice = +movieSelect.value;

function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}

function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
  const selectedSeatsCount = selectedSeats.length;
  count.innerText = selectedSeatsCount;
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
  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

movieSelect.addEventListener('change', (e) => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

container.addEventListener('click', (e) => {
  if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
    e.target.classList.toggle('selected');
    updateSelectedCount();
  }
});

purchaseButton.textContent = 'Купіць месца(-сцы)';
purchaseButton.classList.add('purchase');
container.appendChild(purchaseButton);

purchaseButton.addEventListener('click', () => {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  const selectedSeatsInfo = {
    movie: movieSelect.options[movieSelect.selectedIndex].text,
    seats: [...selectedSeats].map(seat => seat.innerText),
    total: total.innerText
  };
  if (usernameInput.value.trim() === '') {
    const notification = createNotification('Калі ласка, увядзіце ваша імя, каб выбраць месцы.');
    container.appendChild(notification);
  } else {
    selectedSeatsInfo.username = usernameInput.value;
    savePurchaseDataToXML(selectedSeatsInfo);
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
const serializer = new XMLSerializer();
const xmlString = serializer.serializeToString(xmlDoc);
const downloadLink = document.createElement('a');
downloadLink.href = 'data:text/xml;charset=utf-8,' + encodeURIComponent(xmlString);
downloadLink.download = 'purchase.xml';
downloadLink.click();

