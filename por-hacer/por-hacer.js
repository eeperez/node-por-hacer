const fs = require('fs');

let lstPorHacer = [];

let cargarDB = () => {
    try {
        lstPorHacer = require('../db/data.json');
    } catch (error) {
        lstPorHacer = [];
    }
}

let guardarDB = () => {
    let datos = JSON.stringify(lstPorHacer);
    fs.writeFile('./db/data.json', datos, (err) => {
        if (err)
            throw new Error('No se pudo guardar', err);
    })
}

let crearTarea = (cDescripcion) => {
    cargarDB();

    let porHacer = {
        cDescripcion,
        lCompletado: false
    };

    lstPorHacer.push(porHacer);
    guardarDB();

    return porHacer;
}

let obtenerTareas = (lCompletado) => {
    cargarDB();
    let lstTareas = lstPorHacer;

    if (lCompletado != undefined && lCompletado != null) {
        lstTareas = lstPorHacer.filter(tarea => {
            return tarea.lCompletado === lCompletado;
        });
    }

    return lstTareas;
}

let actualizar = (cDescripcion, lCompletado = true) => {
    let lActualizo = false;
    let iIndex = -1;

    cargarDB();

    iIndex = lstPorHacer.findIndex(tarea => tarea.cDescripcion.toUpperCase() === cDescripcion.toUpperCase());

    if (iIndex >= 0) {
        lstPorHacer[iIndex].lCompletado = lCompletado;
        guardarDB();
        lActualizo = true;
    }

    return lActualizo;
}

let borrar = (cDescripcion) => {
    let lBorro = false;
    let iIndex = -1;

    cargarDB();

    iIndex = lstPorHacer.findIndex(tarea => tarea.cDescripcion.toUpperCase() === cDescripcion.toUpperCase());
    if (iIndex >= 0) {
        lstPorHacer.splice(iIndex, 1);
        guardarDB();
        lBorro = true;
    }

    return lBorro;
}

let borrarFilter = (cDescripcion) => {
    let lBorro = false

    cargarDB();

    //regresa un listado donde su descripcion es diferente a la recibida
    let lstNuevo = lstPorHacer.filter(tarea => {
        return tarea.cDescripcion.toUpperCase() !== cDescripcion.toUpperCase();
    });

    if (lstNuevo.length === lstPorHacer.length) {
        lBorro = false;
    } else {
        lBorro = true;
        lstPorHacer = lstNuevo;
        guardarDB();
    }

    return lBorro;
}

module.exports = {
    crearTarea,
    obtenerTareas,
    actualizar,
    borrar,
    borrarFilter
}