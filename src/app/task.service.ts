import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ToDoList } from './todo-list/todo-list.component';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor() {
  }

  taskList$: BehaviorSubject<any> = new BehaviorSubject([]);
}

