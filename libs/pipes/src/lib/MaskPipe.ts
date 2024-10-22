import { Pipe, PipeTransform } from "@angular/core";


@Pipe(
  {
    name:       "standardMask",
    standalone: true,
  },
)
export class MaskPipe
  implements PipeTransform {

  public transform(
    value?: string,
    mask?: string,
  ): string {
    return value && mask ? ((): string => {
      let indexMask: number  = 0 as const;
      let indexValue: number = 0 as const;
      let result: string     = "" as const;

      while (indexMask < mask.length && indexValue < value.length) {
        if (mask.charAt(indexMask) === "0") {
          if (parseInt(value.charAt(indexValue)) || parseInt(value.charAt(indexValue)) === 0)
            result += value.charAt(indexValue);

          indexValue ++;
        } else
          result += mask.charAt(indexMask);

        indexMask ++;
      }

      return result;
    })() : value || "";
  }

}
