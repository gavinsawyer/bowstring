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

  protected readonly brandBackgroundDark$: Signal<`hsl(${ number }, ${ number }%, ${ number }%)`>  = signal<`hsl(${ number }, ${ number }%, ${ number }%)`>(((color: Color): `hsl(${ number }, ${ number }%, ${ number }%)` => `hsl(${ color.hue }, ${ 100 * Math.max(0, Math.min(1, (1 - 0.0625) * color.saturation)) }%, ${ 100 * Math.max(0, Math.min(1, (1 - 0.0625) * color.lightness)) }%)`)(this.brand.primaryColor));
  protected readonly brandBackgroundLight$: Signal<`hsl(${ number }, ${ number }%, ${ number }%)`> = signal<`hsl(${ number }, ${ number }%, ${ number }%)`>(((color: Color): `hsl(${ number }, ${ number }%, ${ number }%)` => `hsl(${ color.hue }, ${ 100 * Math.max(0, Math.min(1, (1 + 0.0625) * color.saturation)) }%, ${ 100 * Math.max(0, Math.min(1, (1 + 0.0625) * color.lightness)) }%)`)(this.brand.primaryColor));
  protected readonly brandForegroundDark$: Signal<`hsl(${ number }, ${ number }%, ${ number }%)`>  = signal<`hsl(${ number }, ${ number }%, ${ number }%)`>(((color: Color): `hsl(${ number }, ${ number }%, ${ number }%)` => `hsl(${ color.hue }, ${ 100 * Math.max(0, Math.min(1, Math.pow(color.saturation, color.lightness >= 0.5 ? 2.9375 : 0.1875))) }%, ${ 100 * Math.max(0, Math.min(1, Math.pow(color.lightness, color.lightness >= 0.5 ? 2.9375 : 0.1875))) }%)`)(this.brand.primaryColor));
  protected readonly brandForegroundLight$: Signal<`hsl(${ number }, ${ number }%, ${ number }%)`> = signal<`hsl(${ number }, ${ number }%, ${ number }%)`>(((color: Color): `hsl(${ number }, ${ number }%, ${ number }%)` => `hsl(${ color.hue }, ${ 100 * Math.max(0, Math.min(1, Math.pow(color.saturation, color.lightness >= 0.5 ? 2.8125 : 0.0625))) }%, ${ 100 * Math.max(0, Math.min(1, Math.pow(color.lightness, color.lightness >= 0.5 ? 2.8125 : 0.0625))) }%)`)(this.brand.primaryColor));

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
