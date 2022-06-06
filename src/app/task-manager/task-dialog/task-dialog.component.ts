import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  title: string = '';
  taskManagerFormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    description: new FormControl(),
    status: new FormControl(),
  })

  constructor(private dialog: MatDialog, 
              public dialogRef: MatDialogRef<TaskDialogComponent>, //to close the dialog
              @Inject(MAT_DIALOG_DATA) public data: any) 
              { 
                this.title = data.title;
              }

  ngOnInit(): void {
    console.log("init value: ", this.data)
    if(this.data){
      this.setValue()
    }
  }

  setValue(){
    this.taskManagerFormGroup.setValue({name: this.data.task.name, description: this.data.task.description, status: this.data.task.status})
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

    console.log("save--", this.taskManagerFormGroup.value)

    this.cancel()
  }

  cancel(){
    this.dialogRef.close()
  }

  tagStepperEvent(isNext: boolean){
   if(isNext){
    this.stepper?.next()
   } else {
    this.stepper?.previous()
   }
  }

}
