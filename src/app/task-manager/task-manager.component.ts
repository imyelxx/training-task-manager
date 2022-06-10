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

  populateTable(): void {
    this.tm.getTableData().subscribe({
      next: (data: any) => {
        this.dataSource.data = data;
      }
    });
    //this.clonedDataSource = data;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator; //reason to place on after init: the datasouce should be loaded first before initializing the pagination
    this.dataSource.sort = this.sort;
  }

  search(){
    this.tm.search(this.searchKey).subscribe({
      next: (results) => {
        this.dataSource = new MatTableDataSource(results);
      }
    });
  }

  openDialog(title: string, task?: any){
    if (title == "Edit" && task){
      this.tm.getTableDataById(task.id).subscribe({
        next: (t) => {
          const dialog = this.dialog.open(TaskDialogComponent, {
            data: { title: title, task: t }
          })

          dialog.afterClosed().subscribe((data: any) => {
            if (data && data.data !== undefined) {
              this.tm.editTask(data).subscribe({
                next: () => {
                  this.populateTable()
                  this.cd.detectChanges()
                }
              });
            }
          });
        }
      });
    } else if(title == "Add"){
      const dialog = this.dialog.open(TaskDialogComponent, {
        data: { title: title, task: null }
      })

      dialog.afterClosed().subscribe((data: any) => {
        if (data && data.data !== undefined) {
          this.tm.addTask(data).subscribe(() => {
            this.populateTable()
            this.cd.detectChanges()
          });
        }
      });
    }
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
        this.tm.deleteTask(task.id).subscribe({
          next: () => {
            this.populateTable()
            this.cd.detectChanges()
          }
        });
      }
    })
  }

  notifyEvent(event: number){
    console.log("value from parent: ", event)
  }

}
