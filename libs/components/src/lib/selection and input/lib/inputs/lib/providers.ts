import { type Provider }        from "@angular/core";
import { MaskPipe, UnmaskPipe } from "@standard/pipes";


const providers: Provider[] = [
  MaskPipe,
  UnmaskPipe,
];

export default providers;
