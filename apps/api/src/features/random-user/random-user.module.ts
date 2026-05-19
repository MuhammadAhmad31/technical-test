import { Module } from "@nestjs/common";
import { RandomUserController } from "./random-user.controller.js";
import { RandomUserService } from "./random-user.service.js";

@Module({
  controllers: [RandomUserController],
  providers: [RandomUserService]
})
export class RandomUserModule {}
