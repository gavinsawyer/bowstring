import { NgTemplateOutlet }                                                                                                    from "@angular/common";
import { afterRender, ChangeDetectionStrategy, Component, computed, contentChildren, forwardRef, inject, signal, type Signal } from "@angular/core";
import { NG_VALUE_ACCESSOR }                                                                                                   from "@angular/forms";
import { CanvasDirective, ElevatedDirective, FlexboxContainerDirective, HoverTransformingDirective, WellRoundedDirective }     from "@bowstring/directives";
import { InsertZwnjsPipe, MaskPipe }                                                                                           from "@bowstring/pipes";
import { v7 as uuidV7 }                                                                                                        from "uuid";
import { InputComponent }                                                                                                      from "../../../input/InputComponent";
import { ComboboxInputOptionComponent }                                                                                        from "../combobox option/ComboboxInputOptionComponent";
import providers                                                                                                               from "../providers";


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
        directive: WellRoundedDirective,
        inputs:    [
          "level",
        ],
      },
    ],
    imports:         [
      InsertZwnjsPipe,
      MaskPipe,
      NgTemplateOutlet,
    ],
    providers:       [
      {
        multi:       true,
        provide:     NG_VALUE_ACCESSOR,
        useExisting: forwardRef(
          (): typeof ComboboxInputComponent => ComboboxInputComponent,
        ),
      },
      ...providers,
    ],
    selector:        "bowstring--combobox-input",
    styleUrl:        "ComboboxInputComponent.sass",
    templateUrl:     "ComboboxInputComponent.html",

    standalone: true,
  },
)
export class ComboboxInputComponent
  extends InputComponent {

  constructor() {
    super();

    afterRender(
      (): void => {
        this.hoverTransformingDirective.htmlElementRef$.set(this.htmlDivElementRef$());
        this.wellRoundedDirective.htmlElementRef$.set(this.htmlDivElementRef$());
      },
    );
  }

  protected readonly options$: Signal<readonly ComboboxInputOptionComponent[]> = contentChildren<ComboboxInputOptionComponent>(
    ComboboxInputOptionComponent,
  );

  private readonly optionValues$: Signal<string[]> = computed<string[]>(
    (): string[] => this.options$().map<string>(
      ({ valueInput$ }: ComboboxInputOptionComponent): string => valueInput$(),
    ),
  );

  protected readonly hoverTransformingDirective: HoverTransformingDirective = inject<HoverTransformingDirective>(HoverTransformingDirective);
  protected readonly wellRoundedDirective: WellRoundedDirective             = inject<WellRoundedDirective>(WellRoundedDirective);

  public readonly optionsId$: Signal<`bowstring--input-directive--options-${ string }`> = signal<`bowstring--input-directive--options-${ string }`>(`bowstring--input-directive--options-${ uuidV7() }`);

  protected onBlur(): void {
    if (this.optionValues$().includes(this.value))
      this.onChange?.();
  }

}
