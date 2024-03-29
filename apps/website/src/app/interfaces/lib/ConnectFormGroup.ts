import { FormControl } from "@angular/forms";


export interface ConnectFormGroup {
  "email": FormControl<string>,
  "message": FormControl<string>,
  "name": FormControl<string>,
  "phone": FormControl<string>,
}
