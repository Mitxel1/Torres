import Registro from '../models/registro.js';
import Usuario from '../models/Usuarios.js';

const registrarEntrada2 = async (req, res) => {
  const { codigo } = req.body;

  try {
    const diaActual = obtenerDiaActual();
    if (!diaActual) {
      return res.status(404).json({ error: 'Día no encontrado' });
    }

    const usuario = await Usuario.findOne({ 'codigo': codigo });
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const estado = await registrarEntrada(usuario, diaActual);
    res.status(201).json({ mensaje: 'Entrada registrada correctamente', estado: estado });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const obtenerDiaActual = () => {
  const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const fechaActual = new Date();
  return diasSemana[fechaActual.getDay()];
};

const registrarEntrada = async (usuario, diaActual) => {
  const horaActual = obtenerHoraActual();
  const horarioActual = usuario.horario.find(horario => horario.dia === diaActual); // Buscar el horario correspondiente al día actual
  if (!horarioActual || !Array.isArray(horarioActual.entrada) || !horarioActual.entrada.length) {
    throw new Error('No se encontró el horario de trabajo para el usuario o la hora de entrada esperada no tiene el formato correcto.');
  }

  const horaEntradaEsperada = horarioActual.entrada[0].trim(); // Suponiendo que solo hay una hora de entrada por día
  if (!horaEntradaEsperada.match(/^\d{2}:\d{2}$/)) {
    throw new Error('La hora de entrada esperada no tiene el formato correcto.');
  }

  let estado = '';
  if (horaActual <= horaEntradaEsperada) {
    estado = 'puntual';
  } else if (horaActual < obtenerUmbralRetardo(horaEntradaEsperada)) {
    estado = 'retardo';
  } else {
    estado = 'falta';
  }
  
  const nuevoRegistro = new Registro({ usuario: usuario._id, dia: diaActual, tipo: 'entrada', hora: horaActual, estado: estado });
  await nuevoRegistro.save();
  return estado;
};

const obtenerHoraActual = () => {
  const fechaActual = new Date();
  const horas = String(fechaActual.getHours()).padStart(2, '0');
  const minutos = String(fechaActual.getMinutes()).padStart(2, '0');
  return `${horas}:${minutos}`;
};

// Función para obtener el umbral de retardo (30 minutos después de la hora de entrada esperada)
const obtenerUmbralRetardo = (horaEntradaEsperada) => {
  const [horas, minutos] = horaEntradaEsperada.split(':');
  const horaEntradaEsperadaEnMs = parseInt(horas, 10) * 3600000 + parseInt(minutos, 10) * 60000;
  const umbralRetardoEnMs = horaEntradaEsperadaEnMs + (30 * 60 * 1000);
  const horasUmbral = String(Math.floor(umbralRetardoEnMs / 3600000)).padStart(2, '0');
  const minutosUmbral = String(Math.floor((umbralRetardoEnMs % 3600000) / 60000)).padStart(2, '0');
  return `${horasUmbral}:${minutosUmbral}`;
};

//registrar Salidd
const registrarSalida = async (req, res) => {
  const { codigo } = req.body;

  try {
    const diaActual = obtenerDiaActual();
    if (!diaActual) {
      return res.status(404).json({ error: 'Día no encontrado' });
    }

    const usuario = await Usuario.findOne({ 'codigo': codigo });
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    if (await registrarSalidaSiEsNecesario(usuario, diaActual)) {
      return res.status(201).json({ mensaje: 'Salida registrada correctamente' });
    }

    res.status(400).json({ error: 'No se pudo registrar la salida' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const registrarSalidaSiEsNecesario = async (usuario, diaActual) => {
  const entradaExistente = await Registro.findOne({ usuario: usuario._id, dia: diaActual, tipo: 'entrada' });
  if (entradaExistente) {
    const horaActual = obtenerHoraActual();
    const horarioActual = usuario.horario[0];
    const horaSalidaEsperada = horarioActual.salida;
    const estado = (horaActual <= horaSalidaEsperada) ? 'puntual' : 'tardanza';
    const nuevaSalida = new Registro({ usuario: usuario._id, dia: diaActual, tipo: 'salida', hora: horaActual, estado: estado });
    await nuevaSalida.save();
    return true;
  }
  return false;
};


export {registrarEntrada2, registrarSalida};