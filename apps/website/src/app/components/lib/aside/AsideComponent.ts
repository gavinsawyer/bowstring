import { Component }                                                                                                                                                                                        from "@angular/core";
import { AsideComponent as _AsideComponent, ButtonComponent, CardComponent, FlexboxComponent, FormFieldComponent, HeaderComponent, HeadingGroupComponent, LinkComponent, ListComponent, ListItemComponent } from "@standard/components";
import { NgxMaskDirective }                                                                                                                                                                                 from "ngx-mask";


@Component({
  imports:     [
    _AsideComponent,
    ButtonComponent,
    CardComponent,
    FlexboxComponent,
    HeadingGroupComponent,
    LinkComponent,
    ListComponent,
    ListItemComponent,
    HeaderComponent,
    FormFieldComponent,
    NgxMaskDirective,
  ],
  selector:    "standard-website--aside",
  standalone:  true,
  styleUrls:   [
    "AsideComponent.sass",
  ],
  templateUrl: "AsideComponent.html",
})
export class AsideComponent { }
