
    // Convert a var declaration to const or let where appropriate.
    // Convert a promise-based function (a function call with .then) to instead use async and await.
    // Convert a function declaration into a arrow function.
    // Convert string concatenation to instead use template literals and string interpolation.
    // Convert some object-related code to use ES6 destructuring.

const form = document.querySelector("form");
const section = document.getElementById("weather");

//get the data from open weather map
const url =
  "https://api.openweathermap.org/data/2.5/weather?units=imperial&appid=61ac71fca852832313e86693bf383076&q=";
form.onsubmit = function (e) {
  e.preventDefault();
  const city = this.search.value;
  fetch(url + city)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      displayWeather(data);
      console.log(data);
    })
    .catch(function (err) {
      const wrong = document.createElement("h2");
      wrong.textContent = "Location not found";
      section.appendChild(wrong);
    });
};

function displayWeather(data) {
  form.reset();
  section.innerHTML = "";
  console.log(data.name);
  console.log(data.sys.country);

  //Create the H2
  const h2 = document.createElement("h2");
  h2.textContent = data.name + ", " + data.sys.country;
  section.appendChild(h2);

  //Create the a href to google maps
  const a = document.createElement("a");
  a.textContent = "Click to view map";
  a.href =
    "https://www.google.com/maps/search/?api=1&query=" +
    data.coord.lat +
    "," +
    data.coord.lon;
  section.appendChild(a);

  //Create weather icon
  const icon = document.createElement("img");
  icon.src =
    "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
  section.appendChild(icon);

  //Create description
  const description = document.createElement("p");
  description.textContent = data.weather[0].description;
  description.style.textTransform = "capitalize";
  section.appendChild(description);

  //Create actual like
  const temp = document.createElement("p");
  temp.textContent = "Current: " + data.main.temp;
  section.appendChild(temp);

  //Create feel like
  const feelTemp = document.createElement("p");
  feelTemp.textContent = "Feels like: " + data.main.feels_like;
  section.appendChild(feelTemp);

  //Create Time
  const timeCollect = document.createElement("p");
  const date = new Date(data.dt * 1000); //Multiplay to get to milliseconds
  const timeString = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
  timeCollect.textContent = "Last updated: " + timeString;
  section.appendChild(timeCollect);
}
