import mongoose from "mongoose";

// Definir el esquema para la colección de registros
const registroSchema = new mongoose.Schema({
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuario',
      required: true,
    },
    dia: {
      type: String,
      required: true
    },
    tipo: {
      type: String,
      enum: ['entrada', 'salida'],
      required: true,
    },
    hora: {
      type: String, // Cambiado a cadena es en usuario no ?
      required: true,
  },
    estado: {
      type: String,
      enum: ['puntual', 'retardo', 'falta','tardanza'],
      default: 'puntual',
    }
  });

// Crear el modelo de registro a partir del esquema
const Registro = mongoose.model('Registro', registroSchema);

// Exportar el modelo para poder utilizarlo en otras partes de la aplicación
export default  Registro;
