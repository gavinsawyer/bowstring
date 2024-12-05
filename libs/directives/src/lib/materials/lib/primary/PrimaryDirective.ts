import { Directive, inject, input, type InputSignal, signal, type Signal } from "@angular/core";
import { BRAND }                                                           from "@standard/injection-tokens";
import { type Color }                                                      from "@standard/interfaces";
import { type Brand }                                                      from "@standard/types";


@Directive(
  {
    host: {
      "[style.--standard--primary-directive--background-dark-input]":  "backgroundDarkInput$()",
      "[style.--standard--primary-directive--background-light-input]": "backgroundLightInput$()",
      "[style.--standard--primary-directive--brand-background-dark]":  "brandBackgroundDark$()",
      "[style.--standard--primary-directive--brand-background-light]": "brandBackgroundLight$()",
      "[style.--standard--primary-directive--brand-foreground-dark]":  "brandForegroundDark$()",
      "[style.--standard--primary-directive--brand-foreground-light]": "brandForegroundLight$()",
      "[style.--standard--primary-directive--foreground-dark-input]":  "foregroundDarkInput$()",
      "[style.--standard--primary-directive--foreground-light-input]": "foregroundLightInput$()",
    },

    standalone: true,
  },
)
export class PrimaryDirective {

  private readonly brand: Brand = inject<Brand>(BRAND);

  protected readonly brandBackgroundDark$: Signal<string>  = signal<string>(((color: Color): `hsl(${ number }, ${ number }%, ${ number }%)` => `hsl(${ color.hue }, ${ color.saturation * 100 }%, ${ color.lightness * 100 }%)`)(this.brand.primaryColor));
  protected readonly brandBackgroundLight$: Signal<string> = signal<string>(((color: Color): `hsl(${ number }, ${ number }%, ${ number }%)` => `hsl(${ color.hue }, ${ color.saturation * 120 }%, ${ color.lightness * 120 }%)`)(this.brand.primaryColor));
  protected readonly brandForegroundDark$: Signal<string>  = signal<string>(((color: Color): `hsl(${ number }, ${ number }%, ${ number }%)` => `hsl(${ color.hue }, ${ color.saturation * 80 }%, ${ color.lightness * 144 }%)`)(this.brand.primaryColor));
  protected readonly brandForegroundLight$: Signal<string> = signal<string>(((color: Color): `hsl(${ number }, ${ number }%, ${ number }%)` => `hsl(${ color.hue }, ${ color.saturation * 40 }%, ${ color.lightness * 72 }%)`)(this.brand.primaryColor));

  public readonly backgroundDarkInput$: InputSignal<string | undefined>  = input<string | undefined>(
    undefined,
    {
      alias: "backgroundDark",
    },
  );
  public readonly backgroundLightInput$: InputSignal<string | undefined> = input<string | undefined>(
    undefined,
    {
      alias: "backgroundLight",
    },
  );
  public readonly foregroundDarkInput$: InputSignal<string | undefined>  = input<string | undefined>(
    undefined,
    {
      alias: "foregroundDark",
    },
  );
  public readonly foregroundLightInput$: InputSignal<string | undefined> = input<string | undefined>(
    undefined,
    {
      alias: "foregroundLight",
    },
  );

}
