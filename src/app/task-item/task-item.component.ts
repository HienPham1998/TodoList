import { Component, Input, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { ToDoList } from '../todo-list/todo-list.component';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent implements OnInit {

  @Input() task: ToDoList = {
    title: '',
    description: '',
    dueDate: '',
    piority: ''
  };

  @Input() index = -1;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {

  }


}
