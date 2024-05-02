import { NgOptimizedImage }                  from "@angular/common";
import { Component, Input, numberAttribute } from "@angular/core";


@Component({
  imports:     [
    NgOptimizedImage,
  ],
  selector:    "standard--image",
  standalone:  true,
  styleUrls:   [
    "ImageComponent.sass",
  ],
  templateUrl: "ImageComponent.html",
})
export class ImageComponent {

  @Input({
    required:  true,
    transform: numberAttribute,
  })
  public height?: number;

  @Input({
    required: true,
  })
  public src?: string;

  @Input({
    required:  true,
    transform: numberAttribute,
  })
  public width?: number;

  @Input() public alt?: string;

}
