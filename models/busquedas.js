const axios = require('axios');

class Busquedas {

    historial = ['Cosamaloapan', 'Madrid', 'San José'];
    
    constructor() {
        // TODO: leer DB si existe
    }

    async ciudad(lugar = '') {
        try {
            // TODO: petición http
            const resp = await axios.get('https://reqres.in/api/users?page=2');
            console.log(resp.data);
            return [];
        } catch (error) {
            console.error(error);
            return []; // retorna los lugares
        }
    }
}

module.exports= Busquedas;