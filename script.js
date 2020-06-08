const inputField = document.querySelector(".inputValue");
const button = document.querySelector(".button");
const temp = document.querySelector(".temp");
const wind = document.querySelector(".windSpeed");
const desc = document.querySelector(".des");
const place = document.querySelector(".place");

button.addEventListener("click", () => {
  const city = inputField.value;
  if (city.length > 0) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=329f835db283cc9f631909eb8ec904eb`
    )
      .then((response) => response.json())
      .then((response2) => {
        let inCelcius = Number(response2["main"].temp);
        inCelcius = inCelcius - 273.15;
        place.appendChild(document.createTextNode(response2.name + ", "));
        place.appendChild(document.createTextNode(response2.sys.country));
        temp.appendChild(
          document.createTextNode(Math.round(inCelcius) + "° C")
        );
        wind.appendChild(document.createTextNode(response2["wind"].speed));
        desc.appendChild(document.createTextNode(response2["weather"][0].main));
      });
  }
});
