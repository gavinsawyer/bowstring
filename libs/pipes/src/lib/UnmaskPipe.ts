import { Pipe, PipeTransform } from "@angular/core";


@Pipe(
  {
    name:       "standardUnmask",
    standalone: true,
  },
)
export class UnmaskPipe
  implements PipeTransform {

  public transform(
    value?: string,
    mask?: string,
  ): string {
    return value && mask ? ((): string => {
      let indexMask: number  = 0 as const;
      let indexValue: number = 0 as const;
      let result: string     = "" as const;

      while (indexValue < value.length && indexMask < mask.length) {
        if (mask.charAt(indexMask) === "0") {
          if (parseInt(value.charAt(indexValue)) || parseInt(value.charAt(indexValue)) === 0)
            result += value.charAt(indexValue);

          indexValue ++;
        } else
          if (value.charAt(indexValue) === mask.charAt(indexMask))
            indexValue ++;

        indexMask ++;
      }

      return result;
    })() : value || "";
  }

}
