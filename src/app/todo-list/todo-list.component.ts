import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { TODO_LIST } from '../app.const';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  todoList: ToDoList[] = [];
  indexEdit: any;
  keySearch = new BehaviorSubject('');
  unsubscribe$ = new Subject();

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {

    this.todoList = JSON.parse(localStorage.getItem('todoList') || '');
    // this.taskService.taskList$.subscribe((data) => {
    //   this.todoList = data;
    //   localStorage.setItem('todoList', JSON.stringify(data));
    // });
    // let todoClone = [...this.todoList];
    // this.keySearch.pipe(debounceTime(200), takeUntil(this.unsubscribe$)).subscribe(key => {
    //   // this.todoList = todoClone.filter(ele => {
    //   //   console.log(key, ele);
    //   // })
    // })
    this.getToDoList();
  }

  getToDoList() {
    this.taskService.taskList$.pipe(takeUntil(this.unsubscribe$)).subscribe(res => {
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

  ngOndestroy() {
    this.unsubscribe$.next();
  }

}

export interface ToDoList {
  title: string,
  description: string,
  dueDate: string,
  piority: string
}