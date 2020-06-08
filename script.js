//getting all the elements
const inputField = document.querySelector(".inputValue");
const button = document.querySelector(".button");
const temp = document.querySelector(".temp");
const wind = document.querySelector(".windSpeed");
const desc = document.querySelector(".des");
const place = document.querySelector(".place");
//flag
var counter = 0;

//adding the event listener to the button
button.addEventListener("click", () => {
  //removing the existing elements before painting the new one
  if (counter > 0) {
    temp.removeChild(temp.childNodes[1]);
    wind.removeChild(wind.childNodes[1]);
    desc.removeChild(desc.childNodes[1]);
    place.removeChild(place.childNodes[1]);
    place.removeChild(place.childNodes[1]);
  }
  //getting the city from the inputfield
  const city = inputField.value;
  //checking the length more than 0 to operate
  if (city.length > 0) {
    //fetching the data from the API
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=329f835db283cc9f631909eb8ec904eb`
    )
      .then((response) => response.json())
      .then((response2) => {
        counter += 1;
        //converting the kelvin to celcius
        let inCelcius = Number(response2["main"].temp);
        inCelcius = inCelcius - 273.15;
        //added the location
        place.appendChild(document.createTextNode(response2.name + ", "));
        place.appendChild(document.createTextNode(response2.sys.country));
        //added the temperature
        temp.appendChild(
          document.createTextNode(Math.round(inCelcius) + "° C")
        );
        //added the wind speed
        wind.appendChild(document.createTextNode(response2["wind"].speed));
        //added the description
        desc.appendChild(
          document.createTextNode(response2["weather"][0].description)
        );
      })
      .catch((error) => alert("please, enter a correct city name!"));
    inputField.value = "";
  }
});
