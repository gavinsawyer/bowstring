import { Component }        from "@angular/core";
import { FlexboxComponent } from "../flexbox/FlexboxComponent";


@Component({
  selector:    "standard--aside",
  standalone:  true,
  styleUrls:   [
    "AsideComponent.sass",
  ],
  templateUrl: "AsideComponent.html",
})
export class AsideComponent extends FlexboxComponent { }
