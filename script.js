const inputField = document.querySelector(".inputValue");
const button = document.querySelector(".button");
const temp = document.querySelector(".temp");
const wind = document.querySelector(".windSpeed");
const desc = document.querySelector(".des");

button.addEventListener("click", () => {
  const city = inputField.value;
  if (city.length > 0) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=329f835db283cc9f631909eb8ec904eb`
    )
      .then((response) => response.json())
      .then((response2) => {
        if (response2.cod === "404") {
          alert("Please! Enter a correct name!");
        } else {
          temp.appendChild(document.createTextNode(response2["main"].temp));
          wind.appendChild(document.createTextNode(response2["wind"].speed));
          desc.appendChild(
            document.createTextNode(response2["weather"][0].main)
          );
        }
      });
  }
});
