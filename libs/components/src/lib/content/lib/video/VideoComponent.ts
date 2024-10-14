import { NgTemplateOutlet }                                                                                                                                                   from "@angular/common";
import { afterRender, booleanAttribute, Component, type ElementRef, inject, input, type InputSignal, type InputSignalWithTransform, numberAttribute, type Signal, viewChild } from "@angular/core";
import { CanvasDirective, ContainerDirective, ElevatedDirective, RoundedDirective }                                                                                           from "@standard/directives";


@Component(
  {
    hostDirectives: [
      {
        directive: CanvasDirective,
      },
      {
        directive: ContainerDirective,
        inputs:    [
          "alignSelf",
          "aspectRatio",
          "marginBottom",
          "marginSides",
          "marginTop",
          "overflowX",
          "overflowY",
          "paddingBottom",
          "paddingSides",
          "paddingTop",
          "position",
          "positionBottom",
          "positionLeft",
          "positionRight",
          "positionTop",
          "scrollSnapAlign",
          "scrollSnapStop",
          "scrollSnapType",
        ],
      },
      {
        directive: ElevatedDirective,
        inputs:    [
          "level",
          "materialOpacity",
        ],
      },
      {
        directive: RoundedDirective,
        inputs:    [
          "level",
        ],
      },
    ],
    selector:       "standard--video",
    standalone:     true,
    styleUrls:      [
      "VideoComponent.sass",
    ],
    templateUrl:    "VideoComponent.html",
    imports:        [
      NgTemplateOutlet,
    ],
  },
)
export class VideoComponent {

  constructor() {
    afterRender(
      (): void => this.roundedContainerDirective.htmlElementRef$.set(this.htmlDivElementRef$()),
    );
  }

  private readonly htmlDivElementRef$: Signal<ElementRef<HTMLDivElement>>     = viewChild.required<ElementRef<HTMLDivElement>>("htmlDivElement");
  private readonly htmlVideoElementRef$: Signal<ElementRef<HTMLVideoElement>> = viewChild.required<ElementRef<HTMLVideoElement>>("htmlVideoElement");

  protected readonly roundedContainerDirective: RoundedDirective = inject<RoundedDirective>(RoundedDirective);

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
  public readonly widthInput$: InputSignalWithTransform<number, number | `${ number }`>                                       = input.required<number, number | `${ number }`>(
    {
      alias:     "width",
      transform: numberAttribute,
    },
  );

  public pause(): void {
    this.htmlVideoElementRef$().nativeElement.pause();
  }
  public async play(): Promise<void> {
    return this.htmlVideoElementRef$().nativeElement.play();
  }

}
