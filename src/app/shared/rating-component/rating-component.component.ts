import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-rating-component',
  templateUrl: './rating-component.component.html',
  styleUrls: ['./rating-component.component.scss']
})
export class RatingComponentComponent implements OnInit {

  @Input() rating: number = 0;
  @Output() notify: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
    console.log("rating value:", this.rating)
  }

  counter() {
    return new Array(this.rating);
  }
  
}
