
// Importar el modelo de Usuario
import Usuario from '../models/Usuarios.js';

// Controlador para registrar un nuevo usuario
const registrarUsuario = async (req, res) => {
    const { codigo, nombre, area, horario } = req.body;

    try {
        // Verificar si ya existe un usuario con el mismo código
        const existeUsuario = await Usuario.findOne({ codigo });
        if (existeUsuario) {
            return res.status(400).json({ error: 'El código de empleado ya está en uso' });
        }

        // Crear un nuevo usuario
        const nuevoUsuario = new Usuario({
            codigo,
            nombre,
            area,
            horario
        });

        // Guardar el usuario en la base de datos
        await nuevoUsuario.save();

        res.status(201).json({ message: 'Usuario registrado correctamente' });
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// controlador para obtener todos los usuarios
const obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const obtenerUsuarioPorCodigo = async (req, res) => {
    try {
        const usuario = await Usuario.findOne({ codigo: req.params.codigo });
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json(usuario);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export {registrarUsuario,
    obtenerUsuarios,
    obtenerUsuarioPorCodigo};
