const axios = require('axios');

class Busquedas {

    historial = ['Cosamaloapan', 'Madrid', 'San José'];

    constructor() {
        // TODO: leer DB si existe
    }

    get paramsMapbox() {
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es',
        };
    }

    get paramsOpenWeather() {
        return {
            'appid': process.env.OPEN_WEATHER_KEY,
            'units': 'metric',
            'lang': 'es',
        };
    }

    async ciudad(lugar = '') {
        try {
            // TODO: petición http
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.paramsMapbox,
            });

            const resp = await instance.get();
            return resp.data.features.map(lugar => ({
                id: lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1],
            }));
        } catch (error) {
            console.error(error);
            return []; // retorna los lugares
        }
    }

    async climaLugar(lat, lon) {
        try {
            const instance = axios.create({
                baseURL: 'https://api.openweathermap.org/data/2.5/weather',
                params: {
                    ...this.paramsOpenWeather,
                    lat, lon,
                },
            });

            const { data } = await instance.get();
            return {
                temp: data.main['temp'],
                min: data.main['temp_min'],
                max: data.main['temp_max'],
                desc: data.weather[0]['description'].green,
            };
        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = Busquedas;