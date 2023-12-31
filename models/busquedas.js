const fs = require('fs');
const axios = require('axios');

class Busquedas {

    historial = [];
    dbPath = './db/database.json';

    constructor() {
        // TODO: leer DB si existe
        this.leerDB();
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

    get historialCapitalizado() {
        return this.historial.map(lugar => {
            let palabras = lugar.split(' ');
            palabras = palabras.map(p => p[0].toUpperCase() + p.substring(1));
            return palabras.join(' ');
        });
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

    agregarHistorial(lugar = '') {
        if (this.historial.includes(lugar.toLocaleLowerCase())) return;
        this.historial = this.historial.splice(0, 5);
        this.historial.unshift(lugar.toLocaleLowerCase());
        this.guardarDB();
    }

    guardarDB() {
        const payload = {
            historial: this.historial,
        };
        fs.writeFileSync(this.dbPath, JSON.stringify(payload));
    }

    leerDB() {
        if (!fs.existsSync(this.dbPath)) return;
        
        const info = fs.readFileSync(this.dbPath, {encoding: 'utf-8'});
        const data = JSON.parse(info);
        this.historial = [...data.historial];
    }
}

module.exports = Busquedas;