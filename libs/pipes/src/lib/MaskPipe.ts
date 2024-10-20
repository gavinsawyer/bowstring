import { Pipe, PipeTransform } from "@angular/core";


@Pipe(
  {
    name:       "standardMask",
    standalone: true,
  },
)
export class MaskPipe
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
