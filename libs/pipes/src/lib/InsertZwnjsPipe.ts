import { Pipe, PipeTransform } from "@angular/core";


@Pipe(
  {
    name:       "standardInsertZwnjs",
    standalone: true,
  },
)
export class InsertZwnjsPipe
  implements PipeTransform {

  transform(
    value?: string,
  ): string {
    if (value)
      return value.replace(
        /\b(\w)/g,
        `$1&zwnj;`,
      );
    else
      return "";
  }

}
