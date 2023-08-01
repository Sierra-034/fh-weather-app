require('dotenv').config();
const { inquirerMenu, pausa, leerInput, listarLugares } = require('./helpers/inquirer');
const Busquedas = require('./models/busquedas');

const main = async () => {
    const busquedas = new Busquedas();
    let opt;
    do {
        opt = await inquirerMenu();

        switch (opt) {
            case 1:
                // Mostrar mensaje
                const termino = await leerInput('Ciudad: ');

                // Buscar lugares
                const lugares = await busquedas.ciudad(termino);

                // Seleccionar el lugar
                const idSeleccionado = await listarLugares(lugares);
                const lugarSeleccionado = lugares.find(lugar => lugar.id === idSeleccionado);
                
                // Clima
                const weatherData = await busquedas.climaLugar(lugarSeleccionado.lat, lugarSeleccionado.lng);
                
                // Mostrar resultados
                console.clear();
                console.log('\nInformación de la ciudad\n'.yellow);
                console.log('Ciudad:', lugarSeleccionado.nombre.green);
                console.log('Lat:', lugarSeleccionado.lat);
                console.log('Lng:', lugarSeleccionado.lng);
                console.log('Temp:', weatherData.temp);
                console.log('Temp-Min:', weatherData.min);
                console.log('Temp-Max:', weatherData.max);
                console.log('Desc:', weatherData.desc);

                break;
        }

        if (opt !== 0) await pausa();
    } while (opt !== 0);
};

main();
