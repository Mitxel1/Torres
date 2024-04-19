import { Component } from '@angular/core';
import { RegisterService } from '../../register.service';
import { ActivatedRoute, Router  } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './info.component.html',
  styleUrl: './info.component.css'
})
export default class InfoComponent {

  public informacion :any;

  constructor(private route: ActivatedRoute,private registerService:RegisterService,private router : Router) { }

  ngOnInit(){
    // Recuperar los datos del formulario pasados como parámetros de consulta
    this.route.queryParams.subscribe(params => {
      const formData = params["codigo"];
      console.log('Datos del formulario:', formData);
      // Puedes realizar acciones adicionales con los datos del formulario aquí
      this.recuDatos(formData);
    });
    
  }
  
  async recuDatos(formData:any) {
    const data = await this.registerService.obtenerUsuarioPorCodigo(formData);
    this.informacion = data;
    console.log(this.informacion);
    return data;
  }

  regresar() {
    // Redirige a la página principal
    this.router.navigate(['/register']);
  }
  
}
