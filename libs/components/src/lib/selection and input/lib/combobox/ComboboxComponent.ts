import { KeyValuePipe, NgTemplateOutlet }                                                                              from "@angular/common";
import { afterRender, Component, forwardRef, inject, input, type InputSignal, signal, type Signal }                    from "@angular/core";
import { NG_VALUE_ACCESSOR }                                                                                           from "@angular/forms";
import { CanvasDirective, ElevatedDirective, FlexboxContainerDirective, HoverTransformingDirective, RoundedDirective } from "@standard/directives";
import { InsertZwnjsPipe, MaskPipe }                                                                                   from "@standard/pipes";
import { type InputComponentOptions }                                                                                  from "@standard/types";
import { v4 as uuid }                                                                                                  from "uuid";
import { InputComponent, inputComponentProviders }                                                                     from "../input/InputComponent";


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
      KeyValuePipe,
      MaskPipe,
      NgTemplateOutlet,
    ],
    providers:      [
      {
        multi:       true,
        provide:     NG_VALUE_ACCESSOR,
        useExisting: forwardRef(
          (): typeof ComboboxComponent => ComboboxComponent,
        ),
      },
      ...inputComponentProviders,
    ],
    selector:       "standard--combobox",
    standalone:     true,
    styleUrls:      [
      "ComboboxComponent.sass",
    ],
    templateUrl:    "ComboboxComponent.html",
  },
)
export class ComboboxComponent
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

  public readonly optionsId$: Signal<`standard--input-directive--options-${ string }`> = signal<`standard--input-directive--options-${ string }`>(`standard--input-directive--options-${ uuid() }`);
  public readonly optionsInput$: InputSignal<InputComponentOptions>                    = input.required<InputComponentOptions>(
    {
      alias: "options",
    },
  );

  protected onBlur(): void {
    if (Object.values<string>(this.optionsInput$()).includes(this.value))
      this.onChange?.();
  }

}
