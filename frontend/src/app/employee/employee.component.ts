import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, NgControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Employee } from '../data-type';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css',
  providers: [EmployeeService],
})
export class EmployeeComponent implements OnInit {
  empForm!: FormGroup;
  showModal: boolean = false;
  editMode: boolean = false;
  employees!: Employee[];

  constructor(private fb: FormBuilder, private empService: EmployeeService) {
  }

  ngOnInit(): void {
    this.getAllEmployees()
    this.empForm = this.fb.group({
      _id: [''],
      name: ['Alex Johnson', Validators.required],
      position: ['Full Stack developer', Validators.required],
      dept: ['Development']
    })
  }

  // onAddEmployee() {
  //   if (this.empForm.valid) {
  //     console.log(this.empForm.value);
  //     this.empService.addEmployee(this.empForm.value).subscribe(
  //       (res) => {
  //         console.log(res);
  //       },
  //       (err) => {
  //         console.log(err);

  //       }
  //     )
  //     if (this.editMode) {

  //     }
  //   } else {

  //   }
  // }

  showFormModal() {
    this.showModal = true;
  }

  onSubmit(data: Employee) {
    if (this.editMode) {
      this.empService.updateEmployee(data).subscribe(
        (res) => {
          console.log("res : ", res);
          this.getAllEmployees()
          this.showModal = false
          this.editMode = false
        },
        (error) => {
          console.log(error);
        }
      )
    } else {
      this.empService.addEmployee(data).subscribe(
        (res) => {
          console.log("res : ", res);
          this.getAllEmployees()
          this.showModal = false
        },
        (error) => {
          console.log(error);
        }
      )

    }

  }
  oncloseModal() {
    this.showModal = false
    this.editMode = false
  }

  getAllEmployees() {
    this.empService.getEmployeesList().subscribe((res: any) => {
      console.log(res);
      this.employees = res;
      console.log(this.employees);

    })
  }

  onDeleteEmployee(id: string) {
    this.empService.deleteEmployee(id).subscribe((res) => {
      if (confirm("Do you want to delete this employee?")) {
        console.log('delete successfully');
        this.getAllEmployees()
      }
    })
  }

  onEditEmployee(emp:Employee) {
    this.showModal = true;
    this.editMode = true;
    this.empForm.patchValue(emp)
  }

}
