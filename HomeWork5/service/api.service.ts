import axios, { AxiosError } from "axios";
import "dotenv/config"; // Подключение переменных окружения
import { API_KEY_NOT_FOUND, BASE_URL } from "../consts.js";
import { WeatherRequestException } from "../exceptions.js";

// TODO: нужно прописать контракт из документации Open Weather (вместо any)
export const getWeather = async (
  city: string,
  language: string
): Promise<any> => {
  const token = process.env.TOKEN_API;
  if (!token) throw new Error(API_KEY_NOT_FOUND);

  try {
    const { data } = await axios.get(`${BASE_URL}/weather`, {
      params: { q: city, appid: token, lang: language, units: "metric" },
    });

    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new WeatherRequestException(
        `Не удалось получить погоду для ${city}: ${error.message}`
      );
    }
  }
};
