//getting all the elements
const inputField = document.querySelector(".inputValue");
const button = document.querySelector(".button");
const temp = document.querySelector(".temp");
const wind = document.querySelector(".windSpeed");
const desc = document.querySelector(".des");
const place = document.querySelector(".place");
const icon = document.querySelector(".icon");
//flag
var counter = 0;

//just the fetch function
const fetchFunction = () => {
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
    //fetching icons
    fetch("http://openweathermap.org/img/wn/10d@2x.png");
    //fetching the data from the API
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=329f835db283cc9f631909eb8ec904eb`
    )
      .then((response) => response.json())
      .then((response2) => {
        if (response2.cod === "404") {
          alert("please enter a correct city name!");
        } else {
          counter += 1;
          //converting the Kelvin to Celcius
          let inCelcius = Number(response2["main"].temp);
          inCelcius = inCelcius - 273.15;
          //added the icon
          icon.src = `http://openweathermap.org/img/wn/${response2["weather"][0].icon}@2x.png`;
          icon.style.display = "block";

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
        }
      });
    inputField.value = "";
    counter = 0;
  } else {
    //asking for the permission for location
    if ("geolocation" in navigator) {
      console.log("Geo location is available");
      navigator.geolocation.getCurrentPosition((position) => {
        var lat = position.coords.latitude;
        var lon = position.coords.longitude;
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=329f835db283cc9f631909eb8ec904eb`
        )
          .then((response) => response.json())
          .then((response2) => {
            if (counter > 0) {
              temp.removeChild(temp.childNodes[1]);
              wind.removeChild(wind.childNodes[1]);
              desc.removeChild(desc.childNodes[1]);
              place.removeChild(place.childNodes[1]);
              place.removeChild(place.childNodes[1]);
            }
            counter += 1;
            //converting the Kelvin to Celcius
            let inCelcius = Number(response2["main"].temp);
            inCelcius = inCelcius - 273.15;
            //added the icon
            icon.src = `http://openweathermap.org/img/wn/${response2["weather"][0].icon}@2x.png`;
            icon.style.display = "block";
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
          });
      });
    } else {
      alert(
        "Oops! your device doesn't support Geo Location. Please type the location manually"
      );
    }
  }
};

//adding the click functionality
button.addEventListener("click", fetchFunction);

//adding the keypress functionality
inputField.addEventListener("keypress", (event) => {
  if (event.keyCode === 13) {
    fetchFunction();
  }
});

fetchFunction();
