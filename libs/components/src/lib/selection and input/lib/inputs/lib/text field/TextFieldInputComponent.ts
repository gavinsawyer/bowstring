import { NgTemplateOutlet }                                                                                            from "@angular/common";
import { afterRender, Component, forwardRef, inject }                                                                  from "@angular/core";
import { NG_VALUE_ACCESSOR }                                                                                           from "@angular/forms";
import { CanvasDirective, ElevatedDirective, FlexboxContainerDirective, HoverTransformingDirective, RoundedDirective } from "@standard/directives";
import { InsertZwnjsPipe }                                                                                             from "@standard/pipes";
import { InputComponent }                                                                                              from "../../../input/InputComponent";
import providers                                                                                                       from "../providers";


@Component(
  {
    hostDirectives: [
      {
        directive: CanvasDirective,
      },
      {
        directive: ElevatedDirective,
        inputs:    [
          "level",
          "materialOpacity",
        ],
      },
      {
        directive: FlexboxContainerDirective,
        inputs:    [
          "alignContent",
          "alignItems",
          "flexDirection",
          "flexWrap",
          "gapColumn",
          "gapRow",
          "justifyContent",
        ],
      },
      {
        directive: HoverTransformingDirective,
      },
      {
        directive: RoundedDirective,
        inputs:    [
          "level",
        ],
      },
    ],
    imports:        [
      InsertZwnjsPipe,
      NgTemplateOutlet,
    ],
    providers:      [
      {
        multi:       true,
        provide:     NG_VALUE_ACCESSOR,
        useExisting: forwardRef(
          (): typeof TextFieldInputComponent => TextFieldInputComponent,
        ),
      },
      ...providers,
    ],
    selector:       "standard--text-field-input",
    standalone:     true,
    styleUrls:      [
      "TextFieldInputComponent.sass",
    ],
    templateUrl:    "TextFieldInputComponent.html",
  },
)
export class TextFieldInputComponent
  extends InputComponent {

  constructor() {
    super();

    afterRender(
      (): void => {
        this.hoverTransformingDirective.htmlElementRef$.set(this.htmlDivElementRef$());
        this.roundedDirective.htmlElementRef$.set(this.htmlDivElementRef$());
      },
    );
  }

  protected readonly hoverTransformingDirective: HoverTransformingDirective = inject<HoverTransformingDirective>(HoverTransformingDirective);
  protected readonly roundedDirective: RoundedDirective                     = inject<RoundedDirective>(RoundedDirective);

}
