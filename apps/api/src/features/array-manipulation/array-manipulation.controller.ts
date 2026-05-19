import { Body, Controller, Get, Inject, Post } from "@nestjs/common";
import type { ArrayManipulationRequest, ArrayManipulationResponse } from "@repo/shared";
import { ArrayManipulationService } from "./array-manipulation.service.js";

const defaultColors = ["merah", "kuning", "hijau", "pink", "ungu"];
const defaultProducts = ["baju", "celana", "topi", "jaket", "sepatu"];
const defaultPromos = ["Diskon", "Sale", "Diskon", "Sale", "Sale"];

@Controller("array-manipulation")
export class ArrayManipulationController {
  constructor(
    @Inject(ArrayManipulationService)
    private readonly arrayManipulationService: ArrayManipulationService
  ) {}

  @Get("sample")
  sample(): ArrayManipulationResponse {
    return {
      input: {
        colors: defaultColors,
        products: defaultProducts,
        promos: defaultPromos
      },
      result: this.arrayManipulationService.manipulate(defaultColors, defaultProducts, defaultPromos),
      resultWithExtraColor: this.arrayManipulationService.manipulate(
        [...defaultColors, "maroon"],
        defaultProducts,
        defaultPromos
      )
    };
  }

  @Post()
  manipulate(@Body() body: Partial<ArrayManipulationRequest>): ArrayManipulationResponse {
    const colors = body.colors ?? defaultColors;
    const products = body.products ?? defaultProducts;
    const promos = body.promos ?? defaultPromos;

    return {
      input: {
        colors,
        products,
        promos
      },
      result: this.arrayManipulationService.manipulate(colors, products, promos)
    };
  }
}
