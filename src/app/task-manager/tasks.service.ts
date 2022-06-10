import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TaskModel } from '../shared/models/task-model';
import { environment } from '../../environments/environment'
import { Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private baseUrl = environment.api;
  tableData: TaskModel[] = []

  constructor(private http: HttpClient) { }

  private getEndpoint(keyword: string, param?: any): string{
    switch(keyword){
      case 'GET' : return "/tasks";
      case 'POST' : return "/tasks";
      case 'GET_BY_ID' : return `/tasks/${param.id}`;
      case 'PUT': return `/tasks/${param.id}`
      case 'DELETE': return `/tasks/${param.id}`
      default: return "";
    }
  }

  getTableData(): Observable<TaskModel[]> {
    let url = `${this.baseUrl}${this.getEndpoint("GET")}`;
    return this.http.get<TaskModel[]>(url);
  }

  getTableDataById(id: number): Observable<TaskModel[]>{
    let url = `${this.baseUrl}${this.getEndpoint("GET_BY_ID", {id})}`;
    return this.http.get<TaskModel[]>(url);
  }

  search(searchKey: string): Observable<TaskModel[]>{
    if (searchKey == ""){
      return this.getTableData();
    } else {
      let url = `${this.baseUrl}${this.getEndpoint("GET")}`;
      return this.http.get<TaskModel[]>(url).pipe(
        map(tasks => tasks.filter(t => {
          return t.status.toLowerCase().includes(searchKey.toLowerCase()) ||
            t.name.toLowerCase().includes(searchKey.toLowerCase()) ||
            t.description.toLowerCase().includes(searchKey.toLowerCase())
        }))
      );
    }
  }

  addTask({ data }: any): Observable<TaskModel[]> {
    let url = `${this.baseUrl}${this.getEndpoint("POST")}`;
    data.completionRate = 0;
    data.created = new Date();
    data.modified = new Date();

    return this.http.post<TaskModel[]>(url, data);
  }

  editTask({ data }: any): Observable<TaskModel> {
    let url = `${this.baseUrl}${this.getEndpoint("PUT", { id: data.id })}`;
    data.modified = new Date();

    return this.http.put<TaskModel>(url, data);
  }

  deleteTask(id: number): Observable<TaskModel> {
    let url = `${this.baseUrl}${this.getEndpoint("DELETE", { id })}`;
    return this.http.delete<TaskModel>(url);
  }
}
