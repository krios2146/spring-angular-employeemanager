import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  public employees: Employee[] | undefined;

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

  public openModal(employee: Employee, modal: string) {
    const container = document.getElementById('container');
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.style.display = 'none';
    btn.setAttribute('data-toggle', 'modal');
    if (modal === 'add') {
      btn.setAttribute('data-target', '#addEmployeeModal');
    }
    if (modal === 'edit') {
      btn.setAttribute('data-target', '#updateEmployeeModal');
    }
    if (modal === 'delete') {
      btn.setAttribute('data-target', '#deleteEmployeeModal');
    }
    container?.appendChild(btn);
    btn.click();
  }
}
