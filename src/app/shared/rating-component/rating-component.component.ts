import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-rating-component',
  templateUrl: './rating-component.component.html',
  styleUrls: ['./rating-component.component.scss']
})
export class RatingComponentComponent implements OnInit {

  @Input() rating: number = 0;
  @Output() notify: EventEmitter<number> = new EventEmitter<number>();
  starArray: any = new Array(10);

  constructor() { }

  ngOnInit(): void {
    console.log("rating value:", this.rating)
    this.starArray = new Array(this.rating)
  }

  updateStarRating(isAdd: boolean){
    if(isAdd){
      this.notify.emit(this.rating++)
    } else {
      this.notify.emit(this.rating--)
    }
  }

  counter() {
    return new Array(this.rating);
  }
  

}
