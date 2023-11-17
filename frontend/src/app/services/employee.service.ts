import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  url = 'http://localhost:3000/employees'
  
  constructor(private http : HttpClient) { }
  
  addEmployee(emp: Employee) {
    return this.http.post(this.url, emp)
  }

  getEmployeesList() {
    return this.http.get(this.url)
  }

  deleteEmployee(id:string) {
    return this.http.delete(`${this.url}/${id}`)
  }

  updateEmployee(emp:Employee) {
    return this.http.put(`${this.url}/${emp._id}`, emp)
  }
}
