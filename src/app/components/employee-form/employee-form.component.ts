import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {

  employeeForm!: FormGroup;
  isEditMode = false;
  employeeId!: number;
  loading = false;
  submitting = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.initForm();

    // Check if edit mode
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.employeeId = +id;
      this.loadEmployee(this.employeeId);
    }
  }

  initForm(): void {
    this.employeeForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      department: ['', Validators.required],
      salary: ['', [Validators.required, Validators.min(0)]]
    });
  }

  loadEmployee(id: number): void {
    this.loading = true;
    this.employeeService.getEmployeeById(id).subscribe({
      next: (emp) => {
        this.employeeForm.patchValue(emp);
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = err.message;
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      return;
    }

    this.submitting = true;
    const employee: Employee = this.employeeForm.value;

    const request = this.isEditMode
      ? this.employeeService.updateEmployee(this.employeeId, employee)
      : this.employeeService.createEmployee(employee);

    request.subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.errorMessage = err.message;
        this.submitting = false;
      }
    });
  }

  // Getter helpers for template
  get f() { return this.employeeForm.controls; }

  isInvalid(field: string): boolean {
    const ctrl = this.employeeForm.get(field);
    return !!(ctrl && ctrl.invalid && (ctrl.dirty || ctrl.touched));
  }
}
