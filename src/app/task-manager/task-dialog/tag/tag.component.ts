import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ITags } from 'src/app/shared/models/task-model';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit {
  @Input() tags: ITags[] = [];
  @Output() notifyStepper: EventEmitter<boolean> = new EventEmitter();
  tagFormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
  })

  constructor() { }

  ngOnInit(): void {
    this.setValue()
  }

  setValue(){
    let tagNames = this.tags.map( d => { return d.name})
    this.tagFormGroup.setValue({name: tagNames.toString()})
  }

  step(isNext: boolean){
    this.notifyStepper.emit(isNext)
  }

}
