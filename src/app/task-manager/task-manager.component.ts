import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { TaskDialogComponent } from './task-dialog/task-dialog.component';

@Component({
  selector: 'app-task-manager',
  templateUrl: './task-manager.component.html',
  styleUrls: ['./task-manager.component.scss']
})
export class TaskManagerComponent implements OnInit {
  displayedColumns: string[] = ['name', 'description', 'status', 'created', 'modified', 'action'];
  dataSource = ELEMENT_DATA;

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog(action: string, task?: any){
    const dialog = this.dialog.open(TaskDialogComponent, { 
      data: action
    })
  }

  deleteDialog(){
    const dialog = this.dialog.open(ConfirmationDialogComponent, { 
      data: { 
        title: 'Delete Confirmation', 
        content: 'Are you sure you want to delete this task?', 
        okBtn: 'Yes', 
        cancelBtn: 'No'
      }
    })
    
    //after close of dialog
    //perform delete function
  }
}

export interface Task {
  id: number;
  name: string;
  description: string;
  status: string;
  created: Date;
  modified: Date;
}

const ELEMENT_DATA: Task[] = [
  {id: 1, name: 'Learn Angular', description: 'Sample description here', status: 'Inprogress', created: new Date(),  modified: new Date()},
  {id: 1, name: 'Learn C#', description: 'Sample description here', status: 'Done', created: new Date(),  modified: new Date()},
  {id: 1, name: 'Learn Angular', description: 'Sample description here', status: 'New', created: new Date(),  modified: new Date()},
];