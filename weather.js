const url = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = 'f00c38e0279b7bc85480c3fe775d518c';

const submitBtn = document.getElementById('city-btn');
const locationBtn = document.getElementById('location-btn');

// CITY SEARCH
submitBtn.addEventListener('click', function () {
	const cityName = document.getElementById('city-name').value;
	if (cityName) {
		weatherByCity(cityName);
	}
});

// LOCATION SEARCH
locationBtn.addEventListener('click', function () {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(
			function (position) {
				const lat = position.coords.latitude;
				const lon = position.coords.longitude;
				weatherByCoords(lat, lon);
			},
			function (error) {
				alert("Location access denied or not available.");
			}
		);
	} else {
		alert("Geolocation is not supported by your browser.");
	}
});

// WEATHER BY CITY
async function weatherByCity(cName) {
	const apiURL =
		`${url}?q=${cName}&appid=${apiKey}&units=metric`;

	fetchWeather(apiURL);
}


async function weatherByCoords(lat, lon) {
	const apiURL =
		`${url}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

	fetchWeather(apiURL);
}

// COMMON FETCH FUNCTION
async function fetchWeather(apiURL) {
	try {
		const res = await fetch(apiURL);
		const data = await res.json();

		if (res.ok) {
			weatherShowFn(data);
		} else {
			alert("City/Location not found.");
		}
	} catch (error) {
		console.error("Error fetching weather data:", error);
	}
}


function weatherShowFn(data) {
	$('#cname').text(data.name + ", " + data.sys.country);
	$('#date').text(moment().format('MMMM Do YYYY, h:mm:ss A'));
	$('#temperature').html(`${data.main.temp}°C`);
	$('#description').text(data.weather[0].description);
	$('#wind-speed').html(`Wind Speed: ${data.wind.speed} m/s`);
	$('#weather-info').fadeIn();
}