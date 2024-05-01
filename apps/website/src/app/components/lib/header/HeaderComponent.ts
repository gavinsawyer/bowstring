import { Component, inject }                                                    from "@angular/core";
import * as brand                                                               from "@standard/brand";
import { FlexboxComponent, HeaderComponent as _HeaderComponent, LinkComponent } from "@standard/components";
import { BRAND }                                                                from "@standard/injection-tokens";


@Component({
  imports: [
    _HeaderComponent,
    FlexboxComponent,
    LinkComponent,
  ],
  selector:    "standard-website--header",
  standalone:  true,
  styleUrls:   [
    "HeaderComponent.sass",
  ],
  templateUrl: "HeaderComponent.html",
})
export class HeaderComponent {

  protected readonly brand: typeof brand = inject<typeof brand>(BRAND);

}
