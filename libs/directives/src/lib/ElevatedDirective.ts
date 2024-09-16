import { Directive, input, type InputSignalWithTransform, numberAttribute } from "@angular/core";


@Directive(
  {
    host:       {
      "[style.--standard--elevated-directive--material-opacity-input]": "materialOpacityInput$()",
    },
    standalone: true,
  },
)
export class ElevatedDirective {

  public readonly materialOpacityInput$: InputSignalWithTransform<number | undefined, "" | number | `${ number }`> = input<number | undefined, "" | number | `${ number }`>(
    undefined,
    {
      alias:     "materialOpacity",
      transform: numberAttribute,
    },
  );

}
