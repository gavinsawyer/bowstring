import { Directive, inject, signal, type Signal } from "@angular/core";
import { BRAND }                                  from "@standard/injection-tokens";
import { type Color }                             from "@standard/interfaces";
import { type Brand }                             from "@standard/types";


@Directive(
  {
    host: {
      "[style.--standard--warning-directive--brand-warning-background-dark]":  "brandWarningBackgroundDark$()",
      "[style.--standard--warning-directive--brand-warning-background-light]": "brandWarningBackgroundLight$()",
      "[style.--standard--warning-directive--brand-warning-foreground-dark]":  "brandWarningForegroundDark$()",
      "[style.--standard--warning-directive--brand-warning-foreground-light]": "brandWarningForegroundLight$()",
    },

    standalone: true,
  },
)
export class WarningDirective {

  private readonly brand: Brand = inject<Brand>(BRAND);

  protected readonly brandWarningBackgroundDark$: Signal<`hsl(${ number }, ${ number }%, ${ number }%)`>   = signal<`hsl(${ number }, ${ number }%, ${ number }%)`>(((color: Color): `hsl(${ number }, ${ number }%, ${ number }%)` => `hsl(${ color.hue }, ${ 100 * Math.max(0, Math.min(1, (1 - 0.0625) * color.saturation)) }%, ${ 100 * Math.max(0, Math.min(1, (1 - 0.0625) * color.lightness)) }%)`)(this.brand.warningColor));
  protected readonly brandWarningBackgroundLight$: Signal<`hsl(${ number }, ${ number }%, ${ number }%)`>   = signal<`hsl(${ number }, ${ number }%, ${ number }%)`>(((color: Color): `hsl(${ number }, ${ number }%, ${ number }%)` => `hsl(${ color.hue }, ${ 100 * Math.max(0, Math.min(1, (1 + 0.0625) * color.saturation)) }%, ${ 100 * Math.max(0, Math.min(1, (1 + 0.0625) * color.lightness)) }%)`)(this.brand.warningColor));
  protected readonly brandWarningForegroundDark$: Signal<`hsl(${ number }, ${ number }%, ${ number }%)`>  = signal<`hsl(${ number }, ${ number }%, ${ number }%)`>(((color: Color): `hsl(${ number }, ${ number }%, ${ number }%)` => `hsl(${ color.hue }, ${ 100 * Math.max(0, Math.min(1, Math.pow(color.saturation, color.lightness >= 0.5 ? 2.9375 : 0.1875))) }%, ${ 100 * Math.max(0, Math.min(1, Math.pow(color.lightness, color.lightness >= 0.5 ? 2.9375 : 0.1875))) }%)`)(this.brand.warningColor));
  protected readonly brandWarningForegroundLight$: Signal<`hsl(${ number }, ${ number }%, ${ number }%)`> = signal<`hsl(${ number }, ${ number }%, ${ number }%)`>(((color: Color): `hsl(${ number }, ${ number }%, ${ number }%)` => `hsl(${ color.hue }, ${ 100 * Math.max(0, Math.min(1, Math.pow(color.saturation, color.lightness >= 0.5 ? 2.8125 : 0.0625))) }%, ${ 100 * Math.max(0, Math.min(1, Math.pow(color.lightness, color.lightness >= 0.5 ? 2.8125 : 0.0625))) }%)`)(this.brand.warningColor));

}
