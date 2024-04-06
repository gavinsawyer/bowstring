import { NgComponentOutlet }                                from "@angular/common";
import { Component, Input, OnInit, signal, WritableSignal } from "@angular/core";
import { RouterLink, RouterLinkActive }                     from "@angular/router";
import * as symbolComponents                                from "../symbols";


@Component({
  imports: [
    NgComponentOutlet,
    RouterLink,
    RouterLinkActive,
  ],
  selector:    "standard--link",
  standalone:  true,
  styleUrls:   [
    "LinkComponent.sass",
  ],
  templateUrl: "LinkComponent.html",
})
export class LinkComponent implements OnInit {

  @Input({
    required: true,
  })
  public text!: string;

  @Input() public disabled?: boolean;
  @Input() public symbol?:   (keyof typeof symbolComponents) extends `${infer name}SymbolComponent` ? name : never;
  @Input() public tabindex?: number;
  @Input() public url?:      string;

  protected readonly symbolComponent$: WritableSignal<typeof symbolComponents[keyof typeof symbolComponents] | undefined> = signal<typeof symbolComponents[keyof typeof symbolComponents] | undefined>(
    this.symbol && symbolComponents[`${this.symbol}SymbolComponent`],
  );

  public ngOnInit(): void {
    this
      .symbolComponent$
      .set(
        this.symbol && symbolComponents[`${this.symbol}SymbolComponent`],
      );
  }

}
