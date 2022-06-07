import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent, MatChipList } from '@angular/material/chips';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss']
})
export class TaskDialogComponent implements OnInit {
  @ViewChild('stepper') stepper?: MatStepper;
  @ViewChild('chipList') chipList: MatChipList | undefined;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  title: string = '';
  taskManagerFormGroup = new FormGroup({
    id: new FormControl(null, [Validators.required]),
    name: new FormControl(null, [Validators.required]),
    description: new FormControl(),
    status: new FormControl(),
    tags: new FormArray([]),
    modified: new FormControl(null),
    created: new FormControl(null)
  })

  get tags(){
    return this.taskManagerFormGroup.get("tags") as FormArray
  }

  constructor(private dialog: MatDialog, public dialogRef: MatDialogRef<TaskDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any){
    this.title = data.title;
  }

  ngOnInit(): void {
    if(this.data){
      this.setValue()
    }
  }

  addTag(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      const tags = <FormArray>this.taskManagerFormGroup.get('tags');
      tags.push(new FormGroup({
        id: new FormControl(0, [Validators.required]),
        name: new FormControl(value.trim(), [Validators.required]),
        created: new FormControl(new Date()),
        modified: new FormControl(new Date())
      }));
    }

    if (input) {
      input.value = '';
    }
  }

  removeTag(index: number): void{
    this.tags.removeAt(index);
  }

  setValue(){
    let tags = this.taskManagerFormGroup.get("tags") as FormArray;

    this.taskManagerFormGroup.setValue({
      id: this.data.task && this.isPropertyPresent(this.data.task, "id") ? this.data.task.id : 0,
      name: this.data.task && this.isPropertyPresent(this.data.task, "name") ? this.data.task.name : "",
      description: this.data.task && this.isPropertyPresent(this.data.task, "description") ? this.data.task.description : "",
      status: this.data.task && this.isPropertyPresent(this.data.task, "status") ? this.data.task.status : "",
      tags: [],
      created: this.data.task && this.isPropertyPresent(this.data.task, "created") ? this.data.task.created : "",
      modified: this.data.task && this.isPropertyPresent(this.data.task, "modified") ? this.data.task.modified : "",
    });

    if (this.data.task && this.isPropertyPresent(this.data.task, "tags")) {
      this.data.task.tags.forEach((tag: any) => {
        tags.push(new FormGroup({
          id: new FormControl(tag.id, [Validators.required]),
          name: new FormControl(tag.name, [Validators.required]),
          created: new FormControl(tag.created),
          modified: new FormControl(tag.modified)
        }));
      });
    }
  }

  isPropertyPresent(obj: any, prop: string): boolean {
    return obj.hasOwnProperty(prop) && obj[prop];
  }

  save(){
    this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: this.title + ' Confirmation', //can be convert with backtick `${}`
        content: 'You successfully ' + this.title + ' your task!',
        okBtn: 'Ok',
        cancelBtn: 'Cancel'
      }
    })

    this.cancel(this.taskManagerFormGroup.value);
  }

  cancel(data?: any) {
    this.dialogRef.close({ data })
  }

  tagStepperEvent(isNext: boolean){
   if(isNext){
    this.stepper?.next()
   } else {
    this.stepper?.previous()
   }
  }

}
