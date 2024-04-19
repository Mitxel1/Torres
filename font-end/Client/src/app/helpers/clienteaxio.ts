import axios  from "axios";

/**
   * Funcion para mostar una alerta 
   * @param mensage mensage que se mostrara al usuario
   * @param tipoMensaje admite cualquier cadena para no mostrar como error
   */
const setAlerta =(mensage:string,isError:boolean=true)=>{
    let data = { msg:mensage, error:isError };
    return data;
};

/**
 * Funcion para crear un cliente de Axios
 */
const clienteAxios = axios.create({
  baseURL:'http://localhost:4000/app/user'
});



export {
    setAlerta,
    clienteAxios,
}