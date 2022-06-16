import { Observable, of } from "rxjs";
import { tasks } from "src/app/task-manager/tasks";
import { TaskModel } from "../models/task-model";

export class MockTaskService {

    //mock data
    public tableData: TaskModel[] = JSON.parse(JSON.stringify(tasks)) //** deep clone */

    constructor(){}
    
    getTableData() {
        return of(this.tableData);
    }
    
    getTableDataById(id: number){
      return of([]);
    }
    
    search(searchKey: string){
        this.tableData = this.tableData.filter(d => d.name.toLowerCase().includes(searchKey.toLowerCase()));
        return of(this.tableData);
    }
    
    addTask({ data }: any) {
        this.tableData.push(data);
        return of(this.tableData);
    }
    
    editTask({ data }: any){
        return of([]);
    }
    
    deleteTask(id: number) {
        this.tableData = this.tableData.filter(d => d.id != id);
        return of(this.tableData);
    }
};