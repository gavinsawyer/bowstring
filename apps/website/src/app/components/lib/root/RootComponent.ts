/// <reference types="@angular/localize" />

import { Component, inject, LOCALE_ID } from "@angular/core";
import { ResponsivityService }          from "@standard/services";


@Component({
  selector:    "standard-website--root",
  styleUrls:   [
    "./RootComponent.sass",
  ],
  templateUrl: "./RootComponent.html",
})
export class RootComponent {

  public readonly locale:              string              = inject<string>(LOCALE_ID);
  public readonly responsivityService: ResponsivityService = inject<ResponsivityService>(ResponsivityService);

}
