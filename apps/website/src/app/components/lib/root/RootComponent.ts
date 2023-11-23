import { Component, inject }   from "@angular/core";
import { ResponsivityService } from "@standard/services";


@Component({
  selector:    "standard-website--root",
  styleUrls:   [
    "./RootComponent.sass",
  ],
  templateUrl: "./RootComponent.html",
})
export class RootComponent {

  public readonly responsivityService: ResponsivityService = inject<ResponsivityService>(ResponsivityService);

}
