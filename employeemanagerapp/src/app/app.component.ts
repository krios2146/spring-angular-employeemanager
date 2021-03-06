import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  public employees: Employee[] | undefined;
  public employeeToEdit: Employee | undefined;
  public employeeToDelete: Employee | undefined;

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  public getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (response: Employee[]) => {
        this.employees = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public openModal(employee: Employee, modal: string): void {
    const container = document.getElementById('container');
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.style.display = 'none';
    btn.setAttribute('data-toggle', 'modal');
    if (modal === 'add') {
      btn.setAttribute('data-target', '#addEmployeeModal');
    }
    if (modal === 'edit') {
      this.employeeToEdit = employee;
      btn.setAttribute('data-target', '#updateEmployeeModal');
    }
    if (modal === 'delete') {
      this.employeeToDelete = employee;
      btn.setAttribute('data-target', '#deleteEmployeeModal');
    }
    container?.appendChild(btn);
    btn.click();
  }

  public addEmployee(addForm: NgForm): void {
    this.employeeService.addEmployee(addForm.value).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
    document.getElementById('add-employee-form')?.click();
    addForm.reset();
  }

  public updateEmployee(editForm: NgForm): void {
    var employeeFromEditForm = editForm.value;
    this.employeeService.updateEmployee(employeeFromEditForm).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public deleteEmployee(employee: Employee): void {
    this.employeeService.deleteEmployee(employee?.id).subscribe(
      (response: void) => {
        console.log(response);
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public searchEmployee(key: string): void {
    var results: Employee[] = [];
    for (const employee of this.employees!) {
      if (employee.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(employee);
      }
    }
    this.employees = results;
    if (results.length === 0 || !key) {
      this.getEmployees();
    }
  }
}
