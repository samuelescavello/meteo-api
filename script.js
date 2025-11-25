const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".wheather-box");

search.addEventListener("click", () => {
  const APIKey = "46511b6bf63249d9f5c69107fcb49d4f";
  const city = document.querySelector(".search-box input").value;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.cod === "404") {
        weatherBox.querySelector(".temperature").innerHTML = "—";
        weatherBox.querySelector(".description").innerHTML =
          "Città non trovata";
        weatherBox.querySelector("img").src = "";
        return;
      }

      const temp = Math.round(data.main.temp);
      const desc = data.weather[0].description;
      const icon = data.weather[0].icon;

      const card = document.createElement("div");
      card.innerHTML = `
      <div class="card">
        <img src="https://openweathermap.org/img/wn/${icon}@2x.png" />
        <div>
          <p class="temperature">${temp}°C</p>
          <p class="description">${desc}</p>
        </div>
      </div>
      
      `;
      weatherBox.innerHTML = "";
      weatherBox.appendChild(card);
    });
});
