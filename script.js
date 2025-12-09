const LATITUDE = -12.9714; //Substitua pela coordenada da sua cidade
const LONGITUDE = -38.5014; //Substitua pela coordenada da sua cidade
const API_URL = `https://api.open-meteo.com/v1/forecast?latitude=${LATITUDE}&longitude=${LONGITUDE}&current=temperature_2m,weather_code&timezone=America%2FSao_Paulo`;

//Padrões de cores de acordo com a previsão
const weatherMap = {
  0: {
    description: "Céu limpo",
    icon: "sunny-outline",
    primaryColor: "#f59e0b",
  },
  1: {
    description: "Principalmente limpo",
    icon: "partly-sunny-outline",
    primaryColor: "#fcd34d",
  },
  2: {
    description: "Parcialmente nublado",
    icon: "partly-sunny-outline",
    primaryColor: "#fcd34d",
  },
  3: {
    description: "Nublado",
    icon: "cloudy-outline",
    primaryColor: "#60a5fa",
  },
  45: {
    description: "Neblina",
    icon: "filter-outline",
    primaryColor: "#9ca3af",
  },
  51: {
    description: "Chuvisco leve",
    icon: "rainy-outline",
    primaryColor: "#3b82f6",
  },
  53: {
    description: "Chuvisco moderado",
    icon: "Chuvisco moderado",
    primaryColor: "#3b82f6",
  },
  55: {
    description: "Chuvisco denso",
    icon: "rainy-outline",
    primaryColor: "#3b82f6",
  },
  61: {
    description: "Chuva leve",
    icon: "rainy-outline",
    primaryColor: "#3b82f6",
  },
  63: {
    description: "Chuva moderada",
    icon: "rainy-outline",
    primaryColor: "#3b82f6",
  },
  65: {
    description: "Chuva forte",
    icon: "rainy-outline",
    primaryColor: "#3b82f6",
  },
  71: {
    description: "Nevasca leve",
    icon: "snow-outline",
    primaryColor: "#a3b3cc",
  },
  73: {
    description: "Nevasca moderada",
    icon: "snow-outline",
    primaryColor: "#a3b3cc",
  },
  75: {
    description: "Nevasca forte",
    icon: "snow-outline",
    primaryColor: "#a3b3cc",
  },
  80: {
    description: "Pancadas de chuva leves",
    icon: "rainy-outline",
    primaryColor: "#3b82f6",
  },
  81: {
    description: "Pancadas de chuva moderadas",
    icon: "rainy-outline",
    primaryColor: "#3b82f6",
  },
  82: {
    description: "Pancadas de chuva violentas",
    icon: "rainy-outline",
    primaryColor: "#3b82f6",
  },
  95: {
    description: "Trovoada",
    icon: "thunderstorm-outline",
    primaryColor: "#4f46e5",
  },
  96: {
    description: "Trovoada com granizo",
    icon: "thunderstorm-outline",
    primaryColor: "#4f46e5",
  },
};

async function getWeatherData() {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`Erro na API: Status ${response.status}`);
    }

    const data = await response.json();

    const temperature = data.current.temperature_2m;
    const weatherCode = data.current.weather_code;

    const weatherInfo = weatherMap[weatherCode] || {
      description: "Condição desconhecida",
      icon: "help-circle-outline",
      primaryColor: "#991b1b",
    };

    //Substitua pelo nome da sua cidade
    updateUI("Salvador", temperature, weatherInfo);
  } catch (error) {
    console.error("Erro ao buscar dados do tempo:", error);
    handleError("Não foi possível carregar o tempo.");
  }
}

function handleError(message) {
  document.querySelector("#info p:nth-child(1)").textContent =
    "Algo deu errado";
  document.querySelector("#info p:nth-child(2)").textContent = "!";
  document.querySelector("#info p:nth-child(3)").textContent = message;
  document
    .querySelector("#icon ion-icon")
    .setAttribute("name", "alert-circle-outline");
  document.documentElement.style.setProperty("--primary-color", "#dc2626");
}

function updateUI(cityName, temperature, weatherInfo) {
  document.querySelector("#info p:nth-child(1)").textContent = cityName;
  document.querySelector("#info p:nth-child(2)").textContent = `${Math.round(
    temperature
  )}°`;
  document.querySelector("#info p:nth-child(3)").textContent =
    weatherInfo.description;
  document
    .querySelector("#icon ion-icon")
    .setAttribute("name", weatherInfo.icon);
  document.documentElement.style.setProperty(
    "--primary-color",
    weatherInfo.primaryColor
  );
}

getWeatherData();
