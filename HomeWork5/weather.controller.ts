import express, { Request, Response } from "express";
import { getWeatherString } from "./weather.service.js";
import { WeatherRequestException } from "./exceptions.js";
import { WeatherCity } from "./types.js";

const app = express();
const PORT = process.env.PORT ?? 8000;

app.get("/", async (req: Request<{}, {}, {}, WeatherCity>, res: Response) => {
  try {
    const weather = await getWeatherString(req.query.city);

    res.status(200).send(weather);
  } catch (error) {
    if (error instanceof WeatherRequestException)
      return res.status(400).send(error.message);
    if (error instanceof Error) return res.status(400).send(error.message);

    res.status(500).send(JSON.stringify(error));
  }
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
