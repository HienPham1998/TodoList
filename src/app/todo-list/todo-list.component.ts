import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { TODO_LIST } from '../app.const';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit, OnDestroy {

  todoList: ToDoList[] = [];
  indexEdit: any;
  keySearch = new BehaviorSubject('');
  unsubscribe$ = new Subject();

  constructor(private readonly taskService: TaskService) { }


  ngOnInit(): void {
    this.getToDoList();
  }

  getToDoList() {
    this.taskService.taskList$.pipe(takeUntil(this.unsubscribe$)).subscribe((res: any) => {
      this.todoList = [...res];
      localStorage.setItem(TODO_LIST, JSON.stringify(res));
    })
  }

  onCheckDetail(index: any) {
    this.indexEdit = index;
  }

  onRemove(index: any) {

    this.todoList.splice(index, 1);
    this.taskService.taskList$.next(this.todoList);
  }

  onSearch(event: any) {
    this.keySearch.next(event.target.value);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    localStorage.setItem(TODO_LIST, JSON.stringify(this.todoList));
  }

}

export interface ToDoList {
  title: string,
  description: string,
  dueDate: string,
  piority: string
}