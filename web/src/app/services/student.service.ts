import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Student } from '../interfaces/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private baseUrl = 'http://localhost:5200';
  private baseUrl_students = `${this.baseUrl}/students`;
  private students$: Subject<Student[]> = new Subject();

  constructor(private httpClient: HttpClient) { }

  refreshStudentList() {
    this.httpClient.get<Student[]>(`${this.baseUrl_students}`)
      .subscribe(students => {
        this.students$.next(students);
      });
  }

  getStudents(): Subject<Student[]> {
    this.refreshStudentList();
    return this.students$;
  }
  // GET, POST, PUT, DELETE
  getStudent(id: string): Observable<Student> {
    return this.httpClient.get<Student>(`${this.baseUrl_students}/${id}`);
  }
  createStudent(student: Student): Observable<string> {
    return this.httpClient.post(`${this.baseUrl_students}`, student, { responseType: 'text'});
  }
  updateStudent(id: string, student: Student): Observable<string> {
    return this.httpClient.put(`${this.baseUrl_students}/${id}`, student, { responseType: 'text'});
  }
  deleteStudent(id: string): Observable<string> {
    return this.httpClient.delete(`${this.baseUrl_students}/${id}`, {responseType: 'text'});
  }
}
