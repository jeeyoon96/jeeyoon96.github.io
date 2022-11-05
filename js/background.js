const images = ["0.jpg", "1.jpeg", "2.jpeg", "3.jpeg"];
const chosenImage = images[Math.floor(Math.random() * images.length)];
document.body.style.backgroundImage = `url('img/background/${chosenImage}')`


const calendarImages = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg", "9.jpg", "10.jpg", "11.png", "12.jpg"];
const calendarImg = document.querySelector(".calendar__img");
calendarImg.src = `img/calendar/${calendarImages[today.getMonth()]}`;

