import { Directive, ElementRef, HostBinding, HostListener, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appIsWatched]',
})
export class IsWatchedDirective {

  @Input()
  appIsWatched!: ISerie;

  @HostBinding('style.background-color')
  get bgColor() {
    return this.appIsWatched?.watched ?
      'teal' : 
      'coral';
  }

  constructor(
    private elRef: ElementRef<HTMLElement>,
    private renderer: Renderer2
  ) {}

  ngOnChangesOld(changes: SimpleChanges) {
    if (changes['appIsWatched']) {
      this.renderer.setStyle(
        this.elRef.nativeElement,
        'background-color',
        this.appIsWatched.watched ? 'teal' : 'coral',
      );
    }
      
  }

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    console.log('clicked on', this.appIsWatched.id);
  }
}
