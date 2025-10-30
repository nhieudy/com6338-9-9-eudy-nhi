// Convert a var declaration to const or let where appropriate. DONE
// Convert a promise-based function (a function call with .then) to instead use async and await. DONE
// Convert a function declaration into a arrow function. DONE
// Convert string concatenation to instead use template literals and string interpolation.
// Convert some object-related code to use ES6 destructuring.

const form = document.querySelector("form");
const section = document.getElementById("weather");

//get the data from open weather map
const url = `https://api.openweathermap.org/data/2.5/weather?units=imperial&appid=61ac71fca852832313e86693bf383076&q=`;

form.onsubmit = async (e) => {
  e.preventDefault();
  const city = form.search.value;
  try {
    const res = await fetch(url + city);
    const data = await res.json();
    displayWeather(data);
  } catch (err) {
    const wrong = document.createElement(`h2`);
    wrong.textContent = "Location not found";
    section.appendChild(wrong);
  }
};

const displayWeather = (data) => {
  form.reset();
  section.innerHTML = "";
  console.log(data);
  //Destructuring
  const {
    name,
    sys: { country },
    coord: { lat, lon },
    weather: [{ icon, description }],
    main: { temp, feels_like },
  } = data;
  //Create the H2
  const h2 = document.createElement("h2");
  //template literal string interpolation
  h2.textContent = `${name}, ${country}`;
  section.appendChild(h2);

  //Create the a href to google maps
  const a = document.createElement("a");
  a.textContent = "Click to view map";
  //template literal string interpolation
  a.href = `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`;
  section.appendChild(a);

  //Create weather icon
  const img = document.createElement("img");
  //template literal string interpolation
  img.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  section.appendChild(img);

  //Create description
  const desc = document.createElement("p");
  desc.textContent = description;
  desc.style.textTransform = "capitalize";
  section.appendChild(desc);

  //Create actual like
  const temperature = document.createElement("p");
  //template literal string interpolation
  temperature.textContent = `Current: ${temp}`;
  section.appendChild(temperature);

  //Create feel like
  const feelTemp = document.createElement("p");
  feelTemp.textContent = `Feels like: ${feels_like}`;
  section.appendChild(feelTemp);

  //Create Time
  const timeCollect = document.createElement("p");
  const date = new Date(data.dt * 1000); //Multiplay to get to milliseconds
  const timeString = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
  timeCollect.textContent = `Last updated: " ${timeString};`
  section.appendChild(timeCollect);
};
