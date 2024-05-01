import { Component } from "@angular/core";
import { FlexboxComponent } from "../flexbox/FlexboxComponent";


@Component({
  selector:    "standard--main",
  standalone:  true,
  styleUrls:   [
    "MainComponent.sass",
  ],
  templateUrl: "MainComponent.html",
})
export class MainComponent extends FlexboxComponent { }
