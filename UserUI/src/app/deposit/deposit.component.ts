import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DepositService } from '../deposit.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css'],
})
export class DepositComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private depositService: DepositService
  ) {}
  depositForm: FormGroup;
  loading = false;
  submitted = false;

  ngOnInit(): void {
    var accNo = +localStorage.getItem('savingAccNo');
    console.log(accNo);
    this.depositForm = this.formBuilder.group({
      account: accNo,
      amount: ['', [Validators.required]],
    });
  }

  get saccountno(): any {
    return localStorage.getItem('savingAccNo');
  }
  get fval() {
    return this.depositForm.controls;
  }

  deposit() {
    this.submitted = true;
    if (this.depositForm.invalid) {
      return;
    }
    this.loading = true;
    const result: any = Object.assign({}, this.depositForm.value);
    
    try {
      this.depositService
        .insertEntry(result.account, +result.amount)
        .subscribe((data: any) => {
          this.loading = false;
          if (data.depositStatus == true) {
            Swal.fire({
              icon: 'success',
              title: 'Transaction successful',
              text: data.responseMessage,
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: data.responseMessage,
            });
          }
        });
    } catch {
      this.loading = false;
    }
  }
}
