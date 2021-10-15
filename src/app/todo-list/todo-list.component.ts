import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
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
  $unsubscribe = new Subject();

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.taskService.taskList.subscribe((data) => {
      this.todoList = data;
      localStorage.setItem('todoList', JSON.stringify(data));
    });

    this.keySearch.pipe(debounceTime(200), takeUntil(this.$unsubscribe)).subscribe(key => {

    })
  }

  onCheckDetail(index: any) {
    this.indexEdit = index;
  }

  onRemove(index: any) {
    this.todoList.splice(index, 1);
    this.taskService.taskList.next(this.todoList);
  }

  onSearch(event: any) {

  }

  ngOndestroy() {
    this.$unsubscribe.next();
  }

}

export interface ToDoList {
  title: string,
  description: string,
  dueDate: string,
  piority: string
}