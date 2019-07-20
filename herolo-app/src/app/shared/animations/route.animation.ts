import { trigger, transition, style, animate } from '@angular/animations';

export const routeFadeStateTrigger = trigger('routeFadeState', [
  transition(':enter', [
    style({
      opacity: 0
    }),
    animate(1500)
  ]),
  transition(':leave', animate(1500, style({
    opacity: 1
  })))
]);

export const routeSlideRightTrigger = trigger('routeSlideRight', [
  transition(':enter', [
    style({
      transform: 'translateX(-100%)',
      opacity: 0
    }),
    animate(1400)
  ]),
  transition(':leave', animate(500, style({
    transform: 'translateX(100%)',
    opacity: 1
  })))
]);

export const itemStateTrigger = trigger('itemState', [
  transition(':enter', [
    style({
      transform: 'translateX(-100%)',
      opacity: 0
    }),
    animate(1200)
  ]),
]);



