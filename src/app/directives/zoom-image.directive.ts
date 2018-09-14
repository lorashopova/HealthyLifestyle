import { Directive, ElementRef, HostListener, Input  } from '@angular/core';

@Directive({
  selector: '[appZoomImage]'
})

export class ZoomImageDirective {

  constructor(private element: ElementRef) { }

    @HostListener('mouseenter') onMouseEnter() {

      this.element.nativeElement.style.msTransform = 'scale(1.2)';
      this.element.nativeElement.style.webkitTransform = 'scale(1.2)';
      this.element.nativeElement.style.transform = 'scale(1.2)';
    }

    @HostListener('mouseleave') onMouseLeave() {

      this.element.nativeElement.style.msTransform = 'scale(1)';
      this.element.nativeElement.style.webkitTransform = 'scale(1)';
      this.element.nativeElement.style.transform = 'scale(1)';
    }
}
