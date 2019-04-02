import auto from './../models/Automovil';
import { controlEstacionamiento } from './../libraries/control-estacionamiento';
import fs from 'fs';

/**
 * Clase que administra la informacion del estacionamiento.
 * El estado inicial de este se reinicia una cada dia.
 */
export class controlAutomovil {
    private file = 'C:/Users/Luis Eguia.EQUIPO-DELL/Documents/Proyectos/Estacionamiento/data/automovil.json';
    private hoy: number = new Date().getDate();
    private automoviles: auto[] = [];
    private control_estacionamiento: controlEstacionamiento = new controlEstacionamiento();

    constructor() {
        let data = require(this.file);
    
        if (this.hoy === data.fecha) {
            this.automoviles = data.autos;
        } else {
            this.grabarArchivo();
        }
    }

    /**
     * Carga la informacion de los cajones y la fecha actual en
     * el archivo automovil.js
     */
    grabarArchivo() {
        let jsonData = {
            fecha: this.hoy,
            autos: this.automoviles
        };

        let jsonDataString = JSON.stringify(jsonData);

        fs.writeFileSync(this.file, jsonDataString);
    }

    /**
     * Crea un elemento a de auto.
     * 
     * @return Automovil creado.
     */
    addAuto(): { auto: auto, autos: auto[] } {
        let auto: auto = {
            estacionado: false,
            fechaLlegada: Date.now(),
            clave: `auto-pro-${Date.now()}`,
            cajonRecomendado: <any>this.control_estacionamiento.getCajonRecomendado().clave
        };

        this.automoviles.push(auto);

        this.grabarArchivo();

        return {
            auto,
            autos: this.automoviles
        };     
    }

    /**
     * Obtiene un automovil.
     * 
     * @param clave Clave del auto a obtener.
     */
    getAuto(clave: string): auto | undefined {
        return this.automoviles.find(auto => auto.clave === clave);
    }

    /**
     * Obtiene la coleccion de automoviles.
     * 
     * @return Colección de automoviles.
     */
    getAutos(): auto[] {
        const data = require(this.file);
        return data.autos;
    }

    /**
     * Cambia diferentes propiedades del auto segun la acción.
     * 
     * @param claveCajon Clave del cajón.
     * @param claveAuto Clave del auto.
     * @param accion Accion que se realizará 'recomendar-cajon', 'ocupar-cajon', 'abandonar-cajon'.
     */
    cambiaEstadoAuto(claveCajon: string, claveAuto: string, accion: string): { auto: auto, automoviles: auto[] } | false {
        let auto = this.getAuto(claveAuto);
        this.automoviles = this.automoviles.filter(auto => auto.clave !== claveAuto);

        if (auto) {
            switch (accion) {
                case 'recomendar-cajon':
                    auto.cajonOcupado = null;
                    auto.cajonRecomendado = claveCajon;
                    auto.estacionado = false;
                    auto.fechaSalida = null
                    break;
            
                case 'ocupar-cajon':
                    auto.cajonOcupado = claveCajon;
                    auto.cajonRecomendado = null;
                    auto.estacionado = true;
                    auto.fechaSalida = null
                    break;

                case 'abandonar-cajon':
                    auto.cajonOcupado = null;
                    auto.cajonRecomendado = null;
                    auto.estacionado = false;
                    auto.fechaSalida = Date.now();
                    break;
            }

            this.automoviles.push(auto);

            this.grabarArchivo();

            return {
                auto,
                automoviles: this.automoviles
            }
        }

        return false;
    }
}