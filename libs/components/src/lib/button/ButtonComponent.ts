import { NgIf, NgTemplateOutlet }                 from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";


@Component({
  imports:     [
    NgTemplateOutlet,
    NgIf,
  ],
  selector:    "standard--button",
  standalone:  true,
  styleUrls:   [
    "ButtonComponent.sass",
  ],
  templateUrl: "ButtonComponent.html",
})
export class ButtonComponent {

  @Output() public readonly action: EventEmitter<void> = new EventEmitter<void>();

  @Input({
    required: true,
  })       public label!: string;
  @Input() public url?:   string;

}
