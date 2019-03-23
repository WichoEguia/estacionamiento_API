import fs from 'fs';

interface auto {
    clave: string;
    estacionado: boolean;
    fechaLlegada: Date | number;
    fechaSalida?: Date | number | null;
    cajonRecomendado?: string | null;
    cajonOcupado?: string | null;
}

/**
 * Clase que administra la informacion del estacionamiento.
 * El estado inicial de este se reinicia una cada dia.
 */
class controlAutomovil {
    private file = 'C:/Users/Luis Eguia.EQUIPO-DELL/Documents/Proyectos/Estacionamiento/server/data/automovil.json';
    private hoy: number = new Date().getDate();
    private automoviles: auto[] = [];

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
    addAuto(): auto {
        let automovil: auto = {
            estacionado: false,
            fechaLlegada: Date.now(),
            clave: `auto-pro-${Date.now()}`
        };

        this.automoviles.push(automovil);

        this.grabarArchivo();

        return automovil;
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
        return this.automoviles;
    }

    /**
     * Cambia diferentes propiedades del auto segun la acción.
     * 
     * @param claveCajon Clave del cajón.
     * @param claveAuto Clave del auto.
     * @param accion Accion que se realizará 'recomendar-cajon', 'ocupar-cajon', 'abandonar-cajon'.
     */
    cambiaEstadoAuto(claveCajon: string, claveAuto: string, accion: string): { autoModificado: auto, automoviles: auto[] } | false {
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
                autoModificado: auto,
                automoviles: this.automoviles
            }
        }

        return false;
    }
}