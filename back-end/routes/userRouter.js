import  express from "express";
import {registrarUsuario, obtenerUsuarios, obtenerUsuarioPorCodigo} from "../controllers/userController.js";
import {registrarEntrada2, registrarSalida} from "../controllers/registerController.js"

const router = express.Router();

//registro de usuarios 
router.post('/register',registrarUsuario);
//registro de entrada
router.post('/entrada',registrarEntrada2);
//registrar Salidas
router.post('/salida', registrarSalida)
// Obtener usuarios
router.get('/usuario', obtenerUsuarios);
// Obtener usuarios por código
router.get('/usuario/:codigo', obtenerUsuarioPorCodigo);


export default router;