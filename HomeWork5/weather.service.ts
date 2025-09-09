import { getWeather } from "./service/api.service.js";
import { ICONS } from "./consts.js";

const getIcon = (icon: string): string => ICONS[icon.slice(0, -1)] ?? "";

export const getWeatherString = async (
  city?: string | string[]
): Promise<string> => {
  const cityName = Array.isArray(city) ? city[0] ?? "Курск" : city ?? "Курск";
  const weather = await getWeather(cityName, "ru");

  return `
    Погода в городе ${weather.name}
    ${getIcon(weather.weather[0].icon)}  ${weather.weather[0].description}
    Температура: ${weather.main.temp} (ощущается как ${weather.main.feels_like})
    Влажность: ${weather.main.humidity}%
    Скорость ветра: ${weather.wind.speed} м/с
  `;
};
