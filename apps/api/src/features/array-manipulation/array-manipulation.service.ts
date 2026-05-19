import { Injectable } from "@nestjs/common";

@Injectable()
export class ArrayManipulationService {
  manipulate(colors: string[], products: string[], promos: string[]) {
    if (colors.length === 0 || products.length === 0 || promos.length === 0) {
      return [];
    }

    return colors.map((_, index) => {
      const product = products[index % products.length];
      const color = colors[this.colorIndexFor(index, colors.length)];
      const promo = promos[index % promos.length];

      return `${this.titleCase(product)} ${this.titleCase(color)} ${this.titleCase(promo)}`;
    });
  }

  private colorIndexFor(index: number, colorCount: number) {
    if (index === 0) return 0;

    const swappedIndex = index % 2 === 1 ? index + 1 : index - 1;
    return swappedIndex < colorCount ? swappedIndex : index % colorCount;
  }

  private titleCase(value: string) {
    return value
      .trim()
      .split(/\s+/)
      .map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1).toLowerCase()}`)
      .join(" ");
  }
}
