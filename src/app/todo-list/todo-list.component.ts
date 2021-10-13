import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  todoList: ToDoList[] = [];


  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.taskService.taskList.subscribe((data) => {
      this.todoList = data;
      localStorage.setItem('todoList', JSON.stringify(data));
    });
  }

}

export interface ToDoList {
  name: string,
  description: string,
  dueDate: string,
  piority: string
}