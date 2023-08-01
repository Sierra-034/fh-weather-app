require('colors');
const inquirer = require('inquirer');

const inquirerMenu = async () => {
    const preguntasMenuPrincipal = {
        type: 'list',
        name: 'opcion',
        message: '¿Qué desea hacer?',
        choices: [
            { value: 1, name: `${'1.'.green} Buscar ciudad.` },
            { value: 2, name: `${'2.'.green} Historial.` },
            { value: 0, name: `${'0.'.green} Salir` },
        ],
    };
    const { opcion } = await inquirer.prompt(preguntasMenuPrincipal);
    return opcion;
};


const pausa = async () => {
    const preguntasPausa = {
        type: 'input',
        name: 'pausaAnswer',
        message: `Presione ${'Enter'.green} para continuar`,
    };
    const { pausaAnswer } = await inquirer.prompt(preguntasPausa);
    return pausaAnswer;
};

const leerInput = async (message) => {
    const question = {
        type: 'input',
        name: 'desc',
        message,
        validate: (value) => {
            if (value.length === 0) return 'Por favor, ingresa un valor';
            return true;
        }
    };

    const {desc} = await inquirer.prompt(question);
    return desc;
};

const listarLugares = async (lugares = []) => {
    const choices = lugares.map((lugar, id) => {
        const idx = `${id + 1}.`.green;
        return {value: lugar.id, name: `${idx} ${lugar.nombre}`};
    });

    choices.unshift({
        value: 0,
        name: '0.'.green + ' Cancelar',
    });

    const preguntas = {
        type: 'list',
        name: 'id',
        message: 'Seleccione lugar',
        choices,
    };

    const {id} = await inquirer.prompt(preguntas);
    return id;
};

const confirmar = async (message) => {
    const question = {
        type: 'confirm',
        name: 'confirm',
        message,
    }
    
    const { confirm } = await inquirer.prompt(question);
    return confirm;
};

const listadoTareasChecklist = async (tareas = []) => {
    const choices = tareas.map((tarea, id) => {
        const idx = `${id + 1}`.green;
        return {
            value: tarea.id,
            name:`${idx}. ${tarea.desc}`,
            checked: (tarea.completadoEn) ? true : false,
        };
    });

    const preguntas = {
        type: 'checkbox',
        name: 'ids',
        message: 'Selecciones',
        choices,
    };

    const {ids} = await inquirer.prompt(preguntas);
    return ids;
};

module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listarLugares,
    confirmar,
    listadoTareasChecklist,
}
