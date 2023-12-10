import { Component, Input } from "@angular/core";


@Component({
  selector:    "standard--capsule",
  standalone:  true,
  styleUrls:   [
    "CapsuleComponent.sass",
  ],
  templateUrl: "CapsuleComponent.html",
})
export class CapsuleComponent {

  @Input({
    required: true,
  }) public label!: string;

}
