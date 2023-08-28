import { SandboxService } from './sandbox.service';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sandbox',
  templateUrl: './sandbox.component.html',
  styleUrls: ['./sandbox.component.css']
})
export class SandboxComponent implements OnInit {
  registerForm!: UntypedFormGroup;
  submitted = false;
  loading: boolean = false;

  constructor(private formBuilder: UntypedFormBuilder, private registerService: SandboxService) { }

  ngOnInit() {
      this.registerForm = this.formBuilder.group({
          start_urls: ['', Validators.required],
          receiver_address: ['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.registerForm.invalid) {
          return;
      }
      this.loading = true
      this.registerService.register(this.registerForm).subscribe( (res:any) =>{
        setTimeout(()=>{}, 2);
        this.loading=false;
      });
      
  }
}
