import { Pipe, PipeTransform } from "@angular/core";


@Pipe(
  {
    name: "standardInsertZwnjs",

    standalone: true,
  },
)
export class InsertZwnjsPipe
  implements PipeTransform {

  public transform(
    value?: string,
  ): string {
    return value ? value.replace(
      /\b(\w)/g,
      `$1&zwnj;`,
    ) : "";
  }

}
