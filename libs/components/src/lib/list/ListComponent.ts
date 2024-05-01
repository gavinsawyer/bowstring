import { NgTemplateOutlet }              from "@angular/common";
import { Component, HostBinding, Input } from "@angular/core";


@Component({
  imports:     [
    NgTemplateOutlet,
  ],
  selector:    "standard--list",
  standalone:  true,
  styleUrls:   [
    "ListComponent.sass",
  ],
  templateUrl: "ListComponent.html",
})
export class ListComponent {

  @HostBinding("class.inline")    protected get classInline():    boolean { return this.type === "inline"; }
  @HostBinding("class.ordered")   protected get classOrdered():   boolean { return this.type === "ordered"; }
  @HostBinding("class.unordered") protected get classUnordered(): boolean { return this.type === "unordered"; }

  @Input({
    required: true,
  })
  public type!: "inline" | "ordered" | "unordered";

}
