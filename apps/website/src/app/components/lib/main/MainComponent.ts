import { Component }                       from "@angular/core";
import { RouterOutlet }                                    from "@angular/router";
import { AsideComponent, MainComponent as _MainComponent } from "@standard/components";


@Component({
  imports:     [
    _MainComponent,
    RouterOutlet,
    AsideComponent,
  ],
  selector:    "standard-website--main",
  standalone:  true,
  styleUrls:   [
    "MainComponent.sass",
  ],
  templateUrl: "MainComponent.html",
})
export class MainComponent { }
