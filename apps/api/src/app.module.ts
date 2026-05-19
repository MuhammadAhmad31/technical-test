import { Module } from "@nestjs/common";
import { ArrayManipulationModule } from "./features/array-manipulation/array-manipulation.module.js";
import { AuthModule } from "./features/auth/auth.module.js";
import { CheckoutModule } from "./features/checkout/checkout.module.js";
import { RandomUserModule } from "./features/random-user/random-user.module.js";
import { SqlSampleModule } from "./features/sql-sample/sql-sample.module.js";

@Module({
  imports: [
    AuthModule,
    CheckoutModule,
    RandomUserModule,
    SqlSampleModule,
    ArrayManipulationModule
  ]
})
export class AppModule {}
