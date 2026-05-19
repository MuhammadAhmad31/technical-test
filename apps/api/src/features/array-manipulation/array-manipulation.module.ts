import { Module } from "@nestjs/common";
import { ArrayManipulationController } from "./array-manipulation.controller.js";
import { ArrayManipulationService } from "./array-manipulation.service.js";

@Module({
  controllers: [ArrayManipulationController],
  providers: [ArrayManipulationService]
})
export class ArrayManipulationModule {}
