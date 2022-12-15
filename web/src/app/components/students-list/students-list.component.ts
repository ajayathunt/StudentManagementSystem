import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from 'src/app/interfaces/student';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent implements OnInit{
  students$: Observable<Student[]> = new Observable();

  constructor(private studentService: StudentService) { };

  ngOnInit(): void {
    this.fetchStudentsList();
  }

  deleteStudent(id: string): void {
    this.studentService.deleteStudent(id).subscribe({
      next: () => this.fetchStudentsList()
    });
  }

  fetchStudentsList(): void {
    this.students$ = this.studentService.getStudents();
  }
}
