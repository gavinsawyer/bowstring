import { NgTemplateOutlet }                                                                                            from "@angular/common";
import { afterRender, ChangeDetectionStrategy, Component, forwardRef, inject }                                         from "@angular/core";
import { NG_VALUE_ACCESSOR }                                                                                           from "@angular/forms";
import { CanvasDirective, ElevatedDirective, FlexboxContainerDirective, HoverTransformingDirective, RoundedDirective } from "@standard/directives";
import { InsertZwnjsPipe }                                                                                             from "@standard/pipes";
import { InputComponent }                                                                                              from "../../../input/InputComponent";
import providers                                                                                                       from "../providers";


@Component(
  {
    changeDetection: ChangeDetectionStrategy.OnPush,
    hostDirectives:  [
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
    imports:         [
      InsertZwnjsPipe,
      NgTemplateOutlet,
    ],
    providers:       [
      {
        multi:       true,
        provide:     NG_VALUE_ACCESSOR,
        useExisting: forwardRef(
          (): typeof DatepickerInputComponent => DatepickerInputComponent,
        ),
      },
      ...providers,
    ],
    selector:        "standard--datepicker-input",
    styleUrls:       [
      "DatepickerInputComponent.sass",
    ],
    templateUrl:     "DatepickerInputComponent.html",

    standalone: true,
  },
)
export class DatepickerInputComponent
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
