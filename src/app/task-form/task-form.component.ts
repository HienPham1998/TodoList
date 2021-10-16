import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { ADD, EDIT, MESSAGE, MINUS_ONE } from '../app.const';
import { TaskService } from '../task.service';
import { ToDoList } from '../todo-list/todo-list.component';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {
  @Input() indexEdit: number = -1;
  @Input() isEdit: boolean = false;
  taskForm: FormGroup = new FormGroup({});
  errMessage = {
    title: '',
    dueDate: ''
  };
  textBtn: string = ADD;
  unsubscribe$ = new Subject();

  constructor(private readonly fb: FormBuilder,
    private readonly taskService: TaskService) { }

  ngOnInit(): void {
    this.initForm();
    this.checkForEdit();
  }

  checkForEdit() {
    if (this.indexEdit !== MINUS_ONE) {
      const todoList: ToDoList[] = [...this.taskService.taskList$.value];
      const { title, description, dueDate, piority } = todoList[this.indexEdit];
      this.taskForm.patchValue({
        title,
        description,
        dueDate,
        piority
      });
      this.textBtn = EDIT;
    }
  }

  initForm() {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      dueDate: [new Date().toISOString().slice(0, 10)],
      piority: [1]
    });
  }

  validateForm() {
    const { title, dueDate } = this.taskForm.controls;
    this.errMessage.title = title.errors && title.errors.required ? MESSAGE.TITLE : '';
    const currentTime = new Date();
    const inputTime = new Date(dueDate.value);
    const condition = currentTime.getDate() <= inputTime.getDate() && currentTime.getMonth() <= inputTime.getMonth() && currentTime.getFullYear() <= inputTime.getFullYear();
    this.errMessage.dueDate = condition ? '' : MESSAGE.DUE_DATE;

    return this.checkError();
  }

  checkError() {
    let result = true;
    Object.values(this.errMessage).forEach(ele => {
      if (ele) {
        result = false;
      }
    });

    return result;
  }

  resetError() {
    this.errMessage = {
      title: '',
      dueDate: ''
    };
  }

  handleClickBtn() {
    const result: boolean = this.validateForm();
    if (result) {
      this.resetError();
      const todoList: ToDoList[] = [...this.taskService.taskList$.value];
      todoList[this.indexEdit !== -1 ? this.indexEdit : todoList.length] = this.taskForm.value;
      todoList.sort((a, b) => {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      });
      this.taskService.taskList$.next(todoList);
      this.initForm();
    }
  }
}
