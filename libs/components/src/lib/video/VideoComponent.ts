import { booleanAttribute, Component, effect, ElementRef, inject, input, InputSignal, InputSignalWithTransform, numberAttribute, Signal, viewChild } from "@angular/core";
import { ContainerDirective, ElevatedContainerDirective, FlexboxContainerChildDirective, RoundedContainerDirective }                                 from "@standard/directives";


@Component(
  {
    hostDirectives: [
      {
        directive: ElevatedContainerDirective,
        inputs:    [
          "materialOpacity",
        ],
      },
      {
        directive: FlexboxContainerChildDirective,
        inputs:    [
          "flexBasis",
          "flexGrow",
          "flexShrink",
        ],
      },
      {
        directive: RoundedContainerDirective,
        inputs:    [
          "borderRadiusFactor",
        ],
      },
    ],
    selector:       "standard--video",
    standalone:     true,
    styleUrls:      [
      "VideoComponent.sass",
    ],
    templateUrl:    "VideoComponent.html",
  },
)
export class VideoComponent {

  constructor() {
    effect(
      (): void => {
        this.containerDirective.htmlElementRef$.set(
          this.htmlVideoElementRef$(),
        );
        this.roundedContainerDirective.htmlElementRef$.set(
          this.htmlVideoElementRef$(),
        );
      },
      {
        allowSignalWrites: true,
      },
    );
  }

  private readonly containerDirective: ContainerDirective                     = inject<ContainerDirective>(ContainerDirective);
  private readonly htmlVideoElementRef$: Signal<ElementRef<HTMLVideoElement>> = viewChild.required<ElementRef<HTMLVideoElement>>("htmlVideoElement");

  protected readonly roundedContainerDirective: RoundedContainerDirective = inject<RoundedContainerDirective>(RoundedContainerDirective);

  public readonly autoplayInput$: InputSignalWithTransform<boolean | undefined, "" | boolean | `${ boolean }`>                = input<boolean | undefined, "" | boolean | `${ boolean }`>(
    undefined,
    {
      alias:     "autoplay",
      transform: booleanAttribute,
    },
  );
  public readonly controlsInput$: InputSignalWithTransform<boolean | undefined, "" | boolean | `${ boolean }`>                = input<boolean | undefined, "" | boolean | `${ boolean }`>(
    undefined,
    {
      alias:     "controls",
      transform: booleanAttribute,
    },
  );
  public readonly disablePictureInPictureInput$: InputSignalWithTransform<boolean | undefined, "" | boolean | `${ boolean }`> = input<boolean | undefined, "" | boolean | `${ boolean }`>(
    undefined,
    {
      alias:     "disablePictureInPicture",
      transform: booleanAttribute,
    },
  );
  public readonly disableRemotePlaybackInput$: InputSignalWithTransform<boolean | undefined, "" | boolean | `${ boolean }`>   = input<boolean | undefined, "" | boolean | `${ boolean }`>(
    undefined,
    {
      alias:     "disableRemotePlayback",
      transform: booleanAttribute,
    },
  );
  public readonly heightInput$: InputSignalWithTransform<number, number | `${ number }`>                                      = input.required<number, number | `${ number }`>(
    {
      alias:     "height",
      transform: numberAttribute,
    },
  );
  public readonly loopInput$: InputSignalWithTransform<boolean | undefined, "" | boolean | `${ boolean }`>                    = input<boolean | undefined, "" | boolean | `${ boolean }`>(
    undefined,
    {
      alias:     "loop",
      transform: booleanAttribute,
    },
  );
  public readonly mutedInput$: InputSignalWithTransform<boolean | undefined, "" | boolean | `${ boolean }`>                   = input<boolean | undefined, "" | boolean | `${ boolean }`>(
    undefined,
    {
      alias:     "muted",
      transform: booleanAttribute,
    },
  );
  public readonly preloadInput$: InputSignalWithTransform<boolean | undefined, "" | boolean | `${ boolean }`>                 = input<boolean | undefined, "" | boolean | `${ boolean }`>(
    undefined,
    {
      alias:     "preload",
      transform: booleanAttribute,
    },
  );
  public readonly srcInput$: InputSignal<string>                                                                              = input.required<string>(
    {
      alias: "src",
    },
  );
  public readonly tabIndexOverrideInput$: InputSignalWithTransform<number | undefined, number | `${ number }`>                = input<number | undefined, number | `${ number }`>(
    undefined,
    {
      alias:     "tabIndexOverride",
      transform: numberAttribute,
    },
  );
  public readonly widthInput$: InputSignalWithTransform<number, number | `${ number }`>                                       = input.required<number, number | `${ number }`>(
    {
      alias:     "width",
      transform: numberAttribute,
    },
  );

  public async pause(): Promise<void> {
    return this.htmlVideoElementRef$()?.nativeElement.pause();
  }
  public async play(): Promise<void> {
    return this.htmlVideoElementRef$()?.nativeElement.play();
  }

}
