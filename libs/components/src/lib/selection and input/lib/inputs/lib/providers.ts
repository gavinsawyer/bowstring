import { type Provider }        from "@angular/core";
import { MaskPipe, UnmaskPipe } from "@bowstring/pipes";


const providers: Provider[] = [
  MaskPipe,
  UnmaskPipe,
];

export default providers;
