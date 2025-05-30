import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as cookieParser from "cookie-parser";
import { BadRequestException, ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function start() {
  try {
    const PORT = process.env.PORT || 3030;
    const app = await NestFactory.create(AppModule);
    app.use(cookieParser());
    app.setGlobalPrefix("api");
    app.useGlobalPipes(new ValidationPipe());

    app.enableCors({
      origin: (origin, callback) => {
        const allowedOrigins = [
          "http://localhost:8000",
          "http://localhost:3000",
          "https://smartmedical.uz",
          "https://api.smartmedical.uz",
          "https://smartmedical.vercel.app",
        ];
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new BadRequestException("Not allowed by CORS"));
        }
      },
      method: "GET, HEAD, PUT, PATCH, POST, DELETE",
      credentials: true, 
    });

    const config = new DocumentBuilder()
      .setTitle("xususiy shifoxona project")
      .setDescription("xususiy shifoxona REST API")
      .setVersion("1.0")
      .addTag("NestJS, Validation, swagger, sequelize")
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("docs", app, document);
    await app.listen(PORT, () => {
      console.log(`server started at; http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}
start();
