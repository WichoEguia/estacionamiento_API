import cajon from './../models/CajonEstacionamiento';
import fs from 'fs';

/**
 * Clase que administra la informacion del estacionamiento.
 * El estado inicial de este se reinicia una cada dia.
 */
export class controlEstacionamiento {
    private file = 'C:/Users/Luis Eguia.EQUIPO-DELL/Documents/Proyectos/Estacionamiento/data/estacionamiento.json';
    private estacionamiento: cajon[] = [];
    private hoy: number | Date = new Date().getDate();

    constructor() {
        let data = require(this.file);

        if (this.hoy === data.fecha) {
            this.estacionamiento = data.estacionamiento;
        } else {
            this.estacionamiento = [];

            for (let i = 0; i < 20; i++) {
                let cajon: cajon = {
                    idx: i,
                    estatus: 'disponible',
                    clave: `cajon-pro-${i + 1}`,
                    ocupante: null
                }

                this.estacionamiento.push(cajon);
            }

            this.grabarArchivo();
        }
    }

    /**
     * Carga la informacion de los cajones y la fecha actual en
     * el archivo estacionamiento.js
     */
    grabarArchivo() {
        this.estacionamiento = this.estacionamiento.sort(this.compare);

        let jsonData = {
            fecha: this.hoy,
            estacionamiento: this.estacionamiento
        };

        let jsonDataString = JSON.stringify(jsonData);

        fs.writeFileSync(this.file, jsonDataString);
    }

    /**
     * Obtiene un cajón por medio de su clave.
     * 
     * @param {string} clave Identificador del objeto del cajón.
     * @returns {cajon} Cajon filtrado del estacionamiento.
     */
    getCajon(clave: string): cajon | undefined {
        return this.estacionamiento.find(cjn => cjn.clave === clave);
    }

    /**
     * Retorna todo el estacionamiento.
     * 
     * @returns {cajon[]} Estacionamiento completo.
     */
    getEstacionamiento(): cajon[] {
        return this.estacionamiento;
    }

    /**
     * Obtiene el cajon recomendado por el sistema.
     * 
     * @returns {cajon} Cajón recomendado.
     */
    getCajonRecomendado(): cajon {
        let cajon: cajon;

        do {
            let idx = Math.floor(Math.random() * 20);
            cajon = this.estacionamiento[idx];
        } while (cajon.estatus === 'ocupado');

        return cajon;
    }

    /**
     * Actualiza estado del cajón y su ocupante.
     * 
     * @param {string} claveCajon Identificador del objeto del cajón.
     * @param {string} claveAuto Identificador del auto.
     * @returns Objeto obtenido o false si no lo encuentra.
     */
    ocuparCajon(claveCajon: string, claveAuto: string): { cajon: cajon, estacionamiento: cajon[] } | false {
        let cajon = this.getCajon(claveCajon);
        this.estacionamiento = this.estacionamiento.filter(cjn => cjn.clave != claveCajon);

        if (cajon) {
            cajon.estatus = 'ocupado';
            cajon.ocupante = claveAuto;
    
            this.estacionamiento.push(cajon);
    
            this.grabarArchivo();

            return {
                cajon,
                estacionamiento: this.estacionamiento
            }
        }

        return false;
    }

    /**
     * Actualiza estado del cajón y su ocupante.
     * 
     * @param {string} claveAuto Identificador del auto.
     * @returns Objeto obtenido o false si no lo encuentra.
     */
    abandonarCajon(claveCajon: string): { cajon: cajon, estacionamiento: cajon[] } | false {
        let cajon = this.getCajon(claveCajon);
        this.estacionamiento = this.estacionamiento.filter(cjn => cjn.clave != claveCajon);

        if (cajon !== undefined) {
            cajon.estatus = 'disponible';
            cajon.ocupante = null;

            this.estacionamiento.push(cajon);

            this.grabarArchivo();

            return {
                cajon,
                estacionamiento: this.estacionamiento
            }
        }

        return false;
    }

    /**
     * Funcion que compara dos objetos para ordenar virtix.
     * 
     * @param a Cajon 1 a comparar.
     * @param b Cajon 2 a comparar.
     */
    compare(a: cajon, b: cajon) {
        if (a.idx > b.idx) return 1;
        if (a.idx < b.idx) return -1;
        
        return 0;
    }
}

