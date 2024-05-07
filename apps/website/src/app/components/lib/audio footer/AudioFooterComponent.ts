import { NgOptimizedImage }                                                       from "@angular/common";
import { Component, HostBinding, inject, signal, ViewChild, WritableSignal }                     from "@angular/core";
import { ButtonComponent, FlexboxComponent, FooterComponent as _FooterComponent, GridComponent } from "@standard/components";
import { ResponsivityService }                                                                   from "@standard/services";


@Component({
  imports:     [
    _FooterComponent,
    ButtonComponent,
    FlexboxComponent,
    GridComponent,
    NgOptimizedImage,
  ],
  selector:    "standard-website--audio-footer",
  standalone:  true,
  styleUrls:   [
    "AudioFooterComponent.sass",
  ],
  templateUrl: "AudioFooterComponent.html",
})
export class AudioFooterComponent {

  @HostBinding("style.--standard-website--audio-footer--border-radius-factor") protected get borderRadiusFactor(): number { return this.footerComponent && this.footerComponent.stuck$() && this.footerComponent.raised$() ? 0.5 : 1; }

  @ViewChild("footerComponent", {
    read:   _FooterComponent,
    static: true,
  })
  private readonly footerComponent?: _FooterComponent;

  protected readonly playing$:            WritableSignal<boolean> = signal<boolean>(false);
  protected readonly responsivityService: ResponsivityService     = inject<ResponsivityService>(ResponsivityService);

}
