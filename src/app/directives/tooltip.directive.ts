import {Directive, ElementRef, Renderer2, Input, HostListener, OnInit} from '@angular/core';

@Directive({
  selector: '[appTooltip]'
})
export class TooltipDirective implements OnInit {

  @Input('tooltipText') tooltipText: string;
  tooltip: HTMLElement;
  parent;
  reference;
  placement: string;

  constructor(private elementRef: ElementRef,
              private renderer: Renderer2
  ) {
  }

  ngOnInit() {
    this.parent = this.elementRef.nativeElement.parentNode;
    this.reference = this.elementRef.nativeElement;
    this.placement = 'top';
  }

  @HostListener('click') onclick() {
    if (!this.tooltip) {
      this.showTooltip();
    }
  }

  @HostListener('window:keydown', ['$event']) handleKeyDown(event: KeyboardEvent) {
    if (this.tooltip && event.key === 'Escape') {
      this.hideTooltip();
    }
  }

  @HostListener('document:click', ['$event']) onDocumentClick(event: MouseEvent) {
    if (this.tooltip) {
      if (event.target !== this.elementRef.nativeElement && event.target !== this.tooltip) {
        this.hideTooltip();
      }
    }
  }

  @HostListener('window:scroll', ['$event']) onScroll(event) {
   if (this.tooltip) {
     this.setPosition();
   }
  }

  createTooltip() {
    this.tooltip = this.renderer.createElement('div');
    this.renderer.addClass(this.tooltip, 'tooltip');
    this.renderer.setStyle(this.tooltip, 'visibility', 'collapse');
    const text = this.renderer.createText(this.tooltipText);
    this.renderer.appendChild(this.tooltip, text);
    this.renderer.appendChild(document.body, this.tooltip);
  }

  showTooltip() {
    this.createTooltip();
    this.setPosition();
    this.renderer.setStyle(this.tooltip, 'visibility', 'visible');
  }

  hideTooltip() {
    this.renderer.removeChild(document.body, this.tooltip);
    this.tooltip = null;
  }

  setPosition() {
    const hostPos = this.elementRef.nativeElement.getBoundingClientRect();
    const tooltipPos = this.tooltip.getBoundingClientRect();
    const scrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    let top, position, offsetValue;
    if ((hostPos.top - tooltipPos.height) > 0) {
      top = hostPos.top - tooltipPos.height;
    } else {
      top = hostPos.bottom;
    }
    if (hostPos.left - tooltipPos.width / 2 > 0 && hostPos.right - tooltipPos.width / 2 > 0) {
      position = 'left';
      offsetValue = hostPos.left + (hostPos.width - tooltipPos.width) / 2;
    } else if (hostPos.left - tooltipPos.width / 2 > 0) {
      position = 'right';
      offsetValue = 10;
    } else {
      position = 'left';
      offsetValue = 10;
    }
    this.renderer.setStyle(this.tooltip, 'top', `${top + scrollPos}px`);
    this.renderer.setStyle(this.tooltip, position, `${offsetValue}px`);
  }

}
