import { Directive, ElementRef, HostListener, OnInit, Renderer2 } from "@angular/core";

@Directive({
  selector: "[appDropdown]"
})
export class DropdownDirective implements OnInit {
  private isDropdownOpen: boolean;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    this.isDropdownOpen = false;
  }

  @HostListener("click") onDropdownClick() {
    this.isDropdownOpen = !this.isDropdownOpen;
    if (this.isDropdownOpen) {
      this.renderer.addClass(this.elementRef.nativeElement, "open");
    } else {
      this.renderer.removeClass(this.elementRef.nativeElement, "open");
    }
  }
}
