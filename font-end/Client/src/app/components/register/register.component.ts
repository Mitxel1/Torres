import { Component } from '@angular/core';
import { RegisterService } from '../../register.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export default class RegisterComponent {

  empresaForm!: FormGroup;

  constructor(private registerServices:RegisterService,
    private formBuilder: FormBuilder,
    private router : Router
  ){};

  ngOnInit(): void{
    this.empresaForm = this.formBuilder.group({
      codigo: ['', Validators.required]
    });
  }
    
   async onSubmit() {
    if (this.empresaForm.valid) {
      // Aquí puedes enviar los datos del formulario
      console.log(this.empresaForm.value);
      const data = await this.registerServices.register(this.empresaForm.value);
      console.log(data)
      this.router.navigate(['/info/:codigo'], { queryParams: this.empresaForm.value });

    } else {
      // Aquí puedes manejar la validación del formulario
      console.log("El formulario no es válido");
    }
  }
}
