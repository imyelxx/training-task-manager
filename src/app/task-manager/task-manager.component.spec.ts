import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { ModalService } from '../shared/mock-test/mock-dialog';
import { MockTaskService } from '../shared/mock-test/mock-task-service';

import { TaskManagerComponent } from './task-manager.component';
import { tasks } from './tasks';
import { TasksService } from './tasks.service';

describe('TaskManagerComponent', () => {
  let component: TaskManagerComponent;
  let fixture: ComponentFixture<TaskManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskManagerComponent ],
      providers: [
        {
          provide: MatDialog,
          useValue: ModalService,
        },
        {
          provide: TasksService,
          useClass: MockTaskService
        },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
        expect(component).toBeTruthy();
  });

  it("should retrieve task management data", () => {
    component.populateTable()
    expect(component.dataSource.data.length).toEqual(tasks.length);
  });

  it("should create new task data", () => {
    //mock data
    const task =  {
      id: 1, name: 'Learn - Angular', description: 'Study life cycle hooks', status: 'In Progress', completionRate: 0, created: new Date(), modified: new Date(),
      tags: [
        { id: 1, name: 'Sample', created: new Date(), modified: new Date() }
      ]
    };

    //mock service
    component.addTaskService(task)

    //assess
    expect(component.dataSource.data.length).toBeGreaterThan(tasks.length);
  });

  it("should search a task data", () => {
    //mock data
    component.searchKey = "Learn"
    //mock method/service
    component.search()
    //assess
    expect(component.dataSource.data.length).toBeGreaterThan(tasks.filter(d => d.name.includes(component.searchKey.toLowerCase())).length);
  });

  it("should delete a task data", () => {
    //mock data
    const task =  {
      id: 1, name: 'Learn - Angular', description: 'Study life cycle hooks', status: 'In Progress', completionRate: 0, created: new Date(), modified: new Date(),
      tags: [
        { id: 1, name: 'Sample', created: new Date(), modified: new Date() }
      ]
    };
    //mock service
    component.deleteTaskService(task)
    //assess
    expect(component.dataSource.data.length).toBeLessThan(tasks.length);
  });

});
