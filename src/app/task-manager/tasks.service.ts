import { Injectable } from '@angular/core';
import { TaskModel } from '../shared/models/task-model';
import { tasks } from './tasks';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  tableData: TaskModel[] = []

  constructor() { }

  getTableData(isAction?: boolean): TaskModel[] {
    if (!isAction) {
      this.tableData = tasks;
    }

    return this.tableData;
  }

  getTableDataById(id: number): TaskModel{
    return this.tableData[id];
  }

  search(searchKey: string): TaskModel[]{
    if (searchKey == ""){
      return this.tableData;
    } else {
      return this.tableData.filter(d => d.status.toLowerCase() == searchKey.toLowerCase())
    }
  }

  addTask({ data }: any): void {
    let lastId = this.tableData[this.tableData.length - 1].id;
    data.id = lastId + 1;
    data.completionRate = 0;
    data.created = new Date();
    data.modified = new Date();
    this.tableData.push(data);
  }

  editTask({ data }: any): void {
    const index = this.tableData.findIndex(t => t.id === data.id);
    data.modified = new Date();
    this.tableData[index] = data;
  }

  deleteTask(id: number): void {
    this.tableData = this.tableData.filter(t => t.id !== id);
  }
}
