import {Directive, ElementRef, Renderer2, Input, HostListener} from '@angular/core';

@Directive({
  selector: '[appTooltip]'
})
export class TooltipDirective {

  @Input('appTooltip') tooltipText: string;
  tooltip: HTMLElement;
  offset  = 8;

  constructor(private elementRef: ElementRef,
              private renderer: Renderer2
  ) {
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

  @HostListener('window:scroll', ['$event']) onScroll() {
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
    let top, position, horizontalOffset;
    if ((hostPos.top - tooltipPos.height - this.offset) > 0) {
      top = hostPos.top - tooltipPos.height - this.offset;
      this.renderer.addClass(this.tooltip, 'tooltip-top');
      this.renderer.removeClass(this.tooltip, 'tooltip-bottom');
    } else {
      top = hostPos.bottom + this.offset;
      this.renderer.removeClass(this.tooltip, 'tooltip-top');
      this.renderer.addClass(this.tooltip, 'tooltip-bottom');
    }
    if (hostPos.left - tooltipPos.width / 2 > 0 && hostPos.right - tooltipPos.width / 2 > 0) {
      position = 'left';
      horizontalOffset = hostPos.left + (hostPos.width - tooltipPos.width) / 2;
    } else if (hostPos.left - tooltipPos.width / 2 > 0) {
      position = 'right';
      horizontalOffset = this.offset;
    } else {
      position = 'left';
      horizontalOffset = this.offset;
    }
    this.renderer.setStyle(this.tooltip, 'top', `${top + scrollPos}px`);
    this.renderer.setStyle(this.tooltip, position, `${horizontalOffset}px`);
  }

}
