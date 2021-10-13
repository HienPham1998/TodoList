import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from 'src/app/task.service';
import { ToDoList } from 'src/app/todo-list/todo-list.component';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {
  todoList: ToDoList[] = [];
  taskForm: FormGroup = new FormGroup({});
  @Input() indexEdit?: number;

  constructor(private formBuilder: FormBuilder, private taskService: TaskService) { }

  ngOnInit(): void {
    this.initForm(this.indexEdit);
    this.todoList = JSON.parse(localStorage.getItem('todoList') || '');
  }

  initForm(indexEdit?: number) {
    this.taskForm = this.formBuilder.group({
      name: this.formBuilder.control('', Validators.required),
      description: this.formBuilder.control(''),
      dueDate: this.formBuilder.control(new Date().toISOString().slice(0, 10)),
      piority: this.formBuilder.control(2)
    }
    );

    if (indexEdit) {
      this.taskForm.patchValue(this.todoList[indexEdit]);
    }

  }

  addTask() {
    this.todoList.push(this.taskForm.value);
    this.taskService.taskList.next(this.todoList);
  }
}
