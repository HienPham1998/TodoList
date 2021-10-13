import { Component, Input, OnInit } from '@angular/core';
import { ToDoList } from '../todo-list/todo-list.component';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent implements OnInit {

  @Input() task: ToDoList = {
    name: '',
    description: '',
    dueDate: '',
    piority: ''
  };

  indexEdit: number = 0;

  constructor() { }

  ngOnInit(): void {



  }

}
