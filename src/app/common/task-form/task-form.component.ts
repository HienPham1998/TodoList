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
  @Input() indexEdit = -1;
  errMessage = {
    title: '',
    dueDate: ''
  };

  constructor(private fb: FormBuilder, private taskService: TaskService) { }

  ngOnInit(): void {
    this.initForm();
    this.todoList = JSON.parse(localStorage.getItem('todoList') || '');
  }

  initForm() {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      dueDate: [new Date().toISOString().slice(0, 10)],
      piority: [1]
    }
    );
  }

  ngDoCheck() {
    if (this.indexEdit >= 0) {
      this.taskForm.patchValue(this.todoList[this.indexEdit]);
    }
  }

  addTask() {
    let control = this.taskForm.controls;

    if (control.title.errors?.required) {
      this.errMessage.title = '*Title is required';
    }
    if (new Date(control.dueDate.value) < new Date()) {
      this.errMessage.dueDate = '*Due date must be greater than or equal to the current date';
    }
    if (!control.title.errors?.required && new Date(control.dueDate.value) >= new Date()) {
      this.errMessage = {
        title: '',
        dueDate: ''
      };
      this.todoList.push(this.taskForm.value);
      this.todoList.sort((a, b) => {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      });

      this.taskService.taskList.next(this.todoList);
      this.initForm();
    }

  }

  updateTask() {
    // this.todoList.splice(this.indexEdit, 1, this.taskForm.value);
    // this.taskService.taskList.next(this.todoList);
  }

}
