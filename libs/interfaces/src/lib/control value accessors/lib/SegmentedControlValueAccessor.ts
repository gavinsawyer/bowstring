import { type ControlValueAccessor } from "@angular/forms";


export interface SegmentedControlValueAccessor
  extends ControlValueAccessor {
  "value": string | null;

  getOptionIndex(value: string | null): number;
}
