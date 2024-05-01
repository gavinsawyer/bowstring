import { NgOptimizedImage }                                     from "@angular/common";
import { Component, inject, signal, WritableSignal }            from "@angular/core";
import { ButtonComponent, FooterComponent as _FooterComponent } from "@standard/components";
import { ResponsivityService }                                  from "@standard/services";


@Component({
  imports:     [
    _FooterComponent,
    ButtonComponent,
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

  protected readonly playing$:            WritableSignal<boolean> = signal<boolean>(false);
  protected readonly responsivityService: ResponsivityService     = inject<ResponsivityService>(ResponsivityService);

}
