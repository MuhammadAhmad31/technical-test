import "reflect-metadata";
import "./config/load-env.js";

import { NestFactory } from "@nestjs/core";
import cookieParser from "cookie-parser";
import { AppModule } from "./app.module.js";
import { appConfig } from "./config/app.config.js";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  app.setGlobalPrefix(appConfig.apiPrefix);
  app.enableCors({
    origin: appConfig.corsOrigins,
    credentials: true
  });

  const port = appConfig.port;
  await app.listen(port);

  console.log(`API ready on http://localhost:${port}/${appConfig.apiPrefix}`);
}

bootstrap();
