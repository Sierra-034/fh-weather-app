const { inquirerMenu, pausa, leerInput } = require('./helpers/inquirer');
const Busquedas = require('./models/busquedas');

const main = async () => {
    const busquedas = new Busquedas();
    let opt;
    do {
        opt = await inquirerMenu();
        console.log({ opt });

        switch (opt) {
            case 1:
                // Mostrar mensaje
                const lugar = await leerInput('Ciudad: ');
                await busquedas.ciudad(lugar);
                // Buscar lugares
                // Seleccionar el lugar
                // Clima
                // Mostrar resultados
                console.log('\nInformación de la ciudad\n'.green);
                console.log('Ciudad: ');
                console.log('Lat: ');
                console.log('Lng: ');
                console.log('Temp: ');
                console.log('Temp-Min: ');
                console.log('Temp-Max: ');

                break;
        }

        if (opt !== 0) await pausa();
    } while (opt !== 0);
};

main();
