const axios = require('axios');

class Busquedas {

    historial = ['Cosamaloapan', 'Madrid', 'San José'];
    
    constructor() {
        // TODO: leer DB si existe
    }

    async ciudad(lugar = '') {
        try {
            // TODO: petición http
            const resp = await axios.get('https://api.mapbox.com/geocoding/v5/mapbox.places/Xalapa.json?limit=5&language=es&access_token=pk.eyJ1Ijoic2llcnJhMDM0IiwiYSI6ImNsa3J3aW1yejA4c2szcG8wemtlMGNmeWIifQ.lItVw2YKQ3Rfl8CfYbn0Cw');
            console.log(resp.data);
            return [];
        } catch (error) {
            console.error(error);
            return []; // retorna los lugares
        }
    }
}

module.exports= Busquedas;