import { Directive, input, type InputSignalWithTransform, numberAttribute } from "@angular/core";


@Directive(
  {
    host:       {
      "[style.--standard--glass-container-directive--material-opacity-input]": "materialOpacityInput$()",
    },
    standalone: true,
  },
)
export class GlassContainerDirective {

  public readonly materialOpacityInput$: InputSignalWithTransform<number | undefined, "" | number | `${ number }`> = input<number | undefined, "" | number | `${ number }`>(
    undefined,
    {
      alias:     "materialOpacity",
      transform: numberAttribute,
    },
  );

}
