const argv = require('./config/yargs').argv;
const porHacer = require('./por-hacer/por-hacer');
const colors = require('colors');

let cComando = argv._[0];

switch (cComando) {
    case 'crear':
        let tarea = porHacer.crearTarea(argv.descripcion);
        console.log(tarea);
        break;
    case 'listar':
        let lstTareas = porHacer.obtenerTareas();
        for (let tarea of lstTareas) {
            console.log('=========Por Hacer========='.green);
            console.log(tarea.cDescripcion);
            console.log('Estado:', tarea.lCompletado);
            console.log('==========================='.green);
        }
        break;
    case 'actualizar':
        let lActualizo = porHacer.actualizar(argv.descripcion, argv.completado);
        console.log(lActualizo);
        break;
    case 'borrar':
        let lBorro = porHacer.borrarFilter(argv.descripcion); //porHacer.borrar(argv.descripcion);
        console.log(lBorro);
        break;
    default:
        console.log('Comando no reconocido');
        break;
}