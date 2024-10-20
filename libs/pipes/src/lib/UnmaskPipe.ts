import { Pipe, PipeTransform } from "@angular/core";


@Pipe(
  {
    name:       "standardUnmask",
    standalone: true,
  },
)
export class UnmaskPipe
  implements PipeTransform {

  transform(
    value?: string,
    mask?: string,
  ): string {
    if (value && mask)
      return ((
        {
          indexMask,
          indexValue,
          result,
        }: { indexMask: 0, indexValue: 0, result: "" }): string => {
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
      })(
        {
          indexMask:  0,
          indexValue: 0,
          result:     "",
        },
      );
    else
      return value || "";
  }

}
