import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Student } from 'src/app/interfaces/student';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent implements OnInit{
  @Input() initialState: BehaviorSubject<Student> = new BehaviorSubject({});
  @Output() formValueChanged = new EventEmitter<Student>();
  @Output() formSubmitted = new EventEmitter<Student>();

  studentForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) {}

  get name() { return this.studentForm.get('name')}
  get house() { return this.studentForm.get('house')}
  get grade() { return this.studentForm.get('grade')}
  get hobby() { return this.studentForm.get('hobby')}

  ngOnInit() {
    this.initialState.subscribe((student) => {
      this.studentForm = this.fb.group({
        name: [ student.name, [Validators.required, Validators.minLength(5)]],
        house: [ student.house, [Validators.required]],
        grade: [ student.grade, [Validators.required]],
        hobby: [ student.hobby, []]
      });
    });
    this.studentForm.valueChanges.subscribe((val) => {
      this.formValueChanged.emit(val);
    });
  }

  submitForm() {
    this.formSubmitted.emit(this.studentForm.value)
  }
}
