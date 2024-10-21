import { NgTemplateOutlet }                                                                                           from "@angular/common";
import { afterRender, Component, computed, type ElementRef, inject, input, type InputSignal, type Signal, viewChild } from "@angular/core";
import { GoogleMap }                                                                                                  from "@angular/google-maps";
import { CanvasDirective, ContainerDirective, ElevatedDirective, RoundedDirective }                                   from "@standard/directives";
import { GoogleMapsJsApiLoaderService }                                                                               from "@standard/services";


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
    imports:        [
      GoogleMap,
      NgTemplateOutlet,
    ],
    selector:       "standard--map",
    standalone:     true,
    styleUrls:      [
      "MapComponent.sass",
    ],
    templateUrl:    "MapComponent.html",
  },
)
export class MapComponent {

  constructor() {
    this.googleMapsJsApiLoaderService.load();

    afterRender(
      (): void => this.roundedDirective.htmlElementRef$.set(this.htmlDivElementRef$()),
    );
  }

  private readonly defaultOptions: google.maps.MapOptions                     = {
    draggableCursor: "grab",
    draggingCursor:  "grabbing",
  };
  private readonly googleMapsJsApiLoaderService: GoogleMapsJsApiLoaderService = inject<GoogleMapsJsApiLoaderService>(GoogleMapsJsApiLoaderService);
  private readonly htmlDivElementRef$: Signal<ElementRef<HTMLDivElement>>     = viewChild.required<ElementRef<HTMLDivElement>>("htmlDivElement");

  protected readonly options$: Signal<google.maps.MapOptions> = computed<google.maps.MapOptions>(
    (): google.maps.MapOptions => ({
      ...this.defaultOptions,
      ...this.optionsInput$(),
    }),
  );
  protected readonly roundedDirective: RoundedDirective       = inject<RoundedDirective>(RoundedDirective);

  public readonly optionsInput$: InputSignal<google.maps.MapOptions | undefined> = input<google.maps.MapOptions | undefined>(
    undefined,
    {
      alias: "options",
    },
  );


}
