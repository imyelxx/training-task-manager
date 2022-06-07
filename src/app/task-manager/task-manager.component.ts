import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TaskModel } from '../shared/models/task-model';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { TaskDialogComponent } from './task-dialog/task-dialog.component';
import { TasksService } from './tasks.service';

@Component({
  selector: 'app-task-manager',
  templateUrl: './task-manager.component.html',
  styleUrls: ['./task-manager.component.scss']
})
export class TaskManagerComponent implements OnInit {

  @ViewChild(MatPaginator) paginator !: MatPaginator; //reason why this "!" the tsconfig.json => "strict": true.
  @ViewChild(MatSort) sort !: MatSort; //reason why this "!" the tsconfig.json => "strict": true.
  displayedColumns: string[] = ['name', 'description', 'status', 'completionRate', 'created', 'modified', 'action'];
  dataSource = new MatTableDataSource<TaskModel>(); //reason of change: to implement sort and pagination
  //clonedDataSource: TaskModel[] = [];
  searchKey: string = "";

  constructor(private dialog: MatDialog, private tm: TasksService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.populateTable();
  }

  populateTable(isAction?: boolean): void {
    let data = this.tm.getTableData(isAction);
    this.dataSource.data = data;
    //this.clonedDataSource = data;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator; //reason to place on after init: the datasouce should be loaded first before initializing the pagination
    this.dataSource.sort = this.sort;
  }

  search(){
    const results = this.tm.search(this.searchKey)
    this.dataSource = new MatTableDataSource(results);
  }

  openDialog(title: string, task?: any){
    let tsk = null;
    if (title == "Edit" && task){
      tsk = this.tm.getTableDataById(task.id);
    }

    const dialog = this.dialog.open(TaskDialogComponent, {
      data: { title: title, task: !tsk ? null : tsk }
    })

    dialog.afterClosed().subscribe((data: any) => {
      if (data && data.data !== undefined) {
        if (title == "Add") {
          this.tm.addTask(data)
        } else if (title == "Edit") {
          this.tm.editTask(data)
        }

        this.populateTable(true)
        this.cd.detectChanges()
      }
    });
  }

  deleteDialog(task: any) {
    const dialog = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Delete Confirmation',
        content: 'Are you sure you want to delete this task?',
        okBtn: 'Yes',
        cancelBtn: 'No'
      }
    })

    dialog.afterClosed().subscribe((isDelete: boolean) => {
      if (isDelete) {
        this.tm.deleteTask(task.id)
        this.populateTable(true)
        this.cd.detectChanges()
      }
    })
  }

  notifyEvent(event: number){
    console.log("value from parent: ", event)
  }

}
