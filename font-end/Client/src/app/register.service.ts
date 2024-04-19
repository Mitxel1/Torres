import { Injectable } from '@angular/core';
import { clienteAxios } from '../app/helpers/clienteaxio';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor() {}

   async register(userData:any){
     try {
      const { data } = await clienteAxios.post("/entrada",userData);
      return data;
     } catch (error) {
      console.log("Error desde angular")
    }
   }

   async obtenerUsuarioPorCodigo(codigo:string){
    try {
      const {data} = await clienteAxios.get(`/usuario/${codigo}`); // Suponiendo que "/usuario/:codigo" sea la ruta correcta en tu servidor
      return data;
    } catch (error) {
      console.log("Usuario no encontrado");
    }
   }
}
