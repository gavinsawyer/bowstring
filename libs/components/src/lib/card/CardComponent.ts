import { Component }        from "@angular/core";
import { FlexboxComponent } from "../flexbox/FlexboxComponent";


@Component({
  selector:    "standard--card",
  standalone:  true,
  styleUrls:   [
    "CardComponent.sass",
  ],
  templateUrl: "CardComponent.html",
})
export class CardComponent extends FlexboxComponent { }
