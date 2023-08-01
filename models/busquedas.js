class Busquedas {

    historial = ['Cosamaloapan', 'Madrid', 'San José'];
    
    constructor() {
        // TODO: leer DB si existe
    }

    async ciudad(lugar = '') {
        // TODO: petición http
        console.log(lugar);
        return []; // retorna los lugares
    }
}

module.exports= Busquedas;