import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
    codigo: { type: String, required: true, unique: true },
    nombre: { type: String, required: true },
    area: { type: String, required: true },
    horario: [{
        tipo: {
            type: String,
            enum: ['Corrido', 'Mixto'], // Tipos de horario permitidos
            required: true
        },
        dia: {
            type: String, // me refiero a esto
            required: true
        },
        entrada:[{
            type: String,
            required: true
        }],
        salida:[{
            type: String,
            required: true
        }]
    }]
});


// Crear el modelo de usuario a partir del esquema
const Usuario = mongoose.model('Usuario', usuarioSchema);

// Exportar el modelo para poder utilizarlo en otras partes de la aplicación
export default Usuario;