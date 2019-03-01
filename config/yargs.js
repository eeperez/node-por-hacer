const descripcion = {
    alias: 'd',
    demand: true,
    desc: 'Descripción de la tarea'
};

const completado = {
    alias: 'c',
    default: true,
    desc: 'Marca como completado o pendiente la tarea'
};

const completadas = {
    alias: 'c',
    desc: 'Filtra las tareas por completado'
}

const argv = require('yargs')
    .command('crear', 'Crear un elemento por hacer', { descripcion })
    .command('actualizar', 'Actualiza el estado completado de una tarea', { descripcion, completado })
    .command('borrar', 'Elimina una tarea', { descripcion })
    .command('listar', 'Muestra las tareas', { completadas })
    .help()
    .argv;

module.exports = {
    argv
}