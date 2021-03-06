const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const message1 = document.querySelector("#msg1");
const message2 = document.querySelector("#msg2");
const head = document.querySelector("#title");
const icon = document.querySelector("#icon");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  head.textContent = "loading...";
  message1.textContent = "";
  message2.textContent = "";
  icon.src = "";

  fetch(`/weather?address=${location}`).then((res) => {
    res.json().then((data) => {
      if (data.error)
        return (message1.textContent = "Please, enter a real address");
      const operator = data.temp === data.feelsLike ? "and" : "but";
      head.textContent = `It's fucking ${data.description.toLowerCase()} right now`;
      message1.textContent = `The temperature is ${data.temp} degrees Fahrenheit, ${operator} it feels like ${data.feelsLike}. Chance of precipitation is ${data.precip}%. Current humidity level is ${data.humidity}%.`;
      message2.textContent = data.location;
      icon.src = data.icon;
      console.log(data.icon);
    });
  });
});
