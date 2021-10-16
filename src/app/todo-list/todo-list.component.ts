import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TODO_LIST } from '../app.const';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(300)
      ]),
      transition(':leave', [
        animate(300, style({ opacity: 0, }))
      ])
    ])
  ]
})
export class TodoListComponent implements OnInit, OnDestroy {

  todoList: ToDoList[] = [];
  stateTodo: boolean[] = [];
  cloneTodoList: ToDoList[] = [];
  stateCheckbox: boolean[] = [];
  unsubscribe$ = new Subject();
  showBulkAction: boolean = false;

  constructor(private readonly taskService: TaskService) { }

  ngOnInit(): void {
    this.getToDoList();
  }

  getToDoList() {
    this.taskService.taskList$.pipe(takeUntil(this.unsubscribe$)).subscribe((res: any) => {
      this.todoList = [...res];
      this.cloneTodoList = [...res];
      this.stateTodo = Array(this.todoList.length).fill(false);
      this.stateCheckbox = Array(this.todoList.length).fill(false);
      localStorage.setItem(TODO_LIST, JSON.stringify(res));
    });
  }

  onCheckDetail(index: number) {
    this.stateTodo[index] = !this.stateTodo[index];

  }

  onRemove(index: number) {
    const cloneList = [...this.todoList];
    cloneList.splice(index, 1);
    this.taskService.taskList$.next(cloneList);
  }

  onSearch(event: KeyboardEvent) {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    this.todoList = value ? this.cloneTodoList.filter(ele => ele.title.toLowerCase().includes(value.toLowerCase())) : this.cloneTodoList;
  }

  onDone() { }

  onRemoveToDoList() {
    const cloneList = [...this.todoList].filter((ele, index) => !this.stateCheckbox[index]);
    this.taskService.taskList$.next(cloneList);
    this.showBulkAction = false;
  }

  handleClickCheckbox(index: number) {
    this.stateCheckbox[index] = !this.stateCheckbox[index];
    this.showBulkAction = !this.checkStatusCheckbox();
  }

  checkStatusCheckbox() {
    return this.stateCheckbox.every(ele => !ele);
  }

  trackByFnc(index: number) {
    return index;
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
};