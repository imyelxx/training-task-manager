import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { TaskDialogComponent } from './task-dialog/task-dialog.component';

@Component({
  selector: 'app-task-manager',
  templateUrl: './task-manager.component.html',
  styleUrls: ['./task-manager.component.scss']
})
export class TaskManagerComponent implements OnInit {

  @ViewChild(MatPaginator) paginator !: MatPaginator; //reason why this "!" the tsconfig.json => "strict": true.
  @ViewChild(MatSort) sort !: MatSort; //reason why this "!" the tsconfig.json => "strict": true.
  
  displayedColumns: string[] = ['name', 'description', 'status', 'created', 'modified', 'action'];
  dataSource = new MatTableDataSource<Task>(ELEMENT_DATA); //reason of change: to implement sort and pagination
  clonedDataSource = ELEMENT_DATA;
  searchKey: string = "";

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator; //reason to place on after init: the datasouce should be loaded first before initializing the pagination
    this.dataSource.sort = this.sort;
  }

  search(){
    let result = this.clonedDataSource.filter(d => d.status.toLowerCase() == this.searchKey.toLowerCase())
    this.dataSource = new MatTableDataSource(result);
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
  {id: 1, name: 'Learn - Angular', description: 'Sample description here', status: 'Inprogress', created: new Date(),  modified: new Date()},
  {id: 2, name: 'Learn C#', description: 'Sample description here', status: 'Done', created: new Date(),  modified: new Date()},
  {id: 3, name: 'Learn - Typescript', description: 'Sample description here', status: 'New', created: new Date(),  modified: new Date()},
  {id: 4, name: 'Learn - HTML', description: 'Sample description here', status: 'New', created: new Date(),  modified: new Date()},
  {id: 5, name: 'Learn - CSS', description: 'Sample description here', status: 'New', created: new Date(),  modified: new Date()},
  {id: 6, name: 'Learn - SQL', description: 'Sample description here', status: 'New', created: new Date(),  modified: new Date()},
  {id: 7, name: 'Learn - Unit Testing', description: 'Sample description here', status: 'New', created: new Date(),  modified: new Date()},
  {id: 8, name: 'Learn - A', description: 'Sample description here', status: 'New', created: new Date(),  modified: new Date()},
  {id: 9, name: 'Learn - B', description: 'Sample description here', status: 'New', created: new Date(),  modified: new Date()},
  {id: 10, name: 'Learn - C', description: 'Sample description here', status: 'New', created: new Date(),  modified: new Date()},
];