import { Directive, inject, input, type InputSignal, signal, type Signal } from "@angular/core";
import { BRAND }                                                           from "@standard/injection-tokens";
import { type Brand }                                                      from "@standard/types";


@Directive(
  {
    host:       {
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

  protected readonly brandBackgroundDark$: Signal<string>  = signal<string>(this.brand.primaryBackgroundDark);
  protected readonly brandBackgroundLight$: Signal<string> = signal<string>(this.brand.primaryBackgroundLight);
  protected readonly brandForegroundDark$: Signal<string>  = signal<string>(this.brand.primaryForegroundDark);
  protected readonly brandForegroundLight$: Signal<string> = signal<string>(this.brand.primaryForegroundLight);

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
