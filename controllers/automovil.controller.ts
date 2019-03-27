import { Request, Response } from "express";
import auto from "../models/Automovil";
import { controlAutomovil } from '../libraries/control-automovil';
import { controlEstacionamiento } from '../libraries/control-estacionamiento';

export class automovilController {
    private control_automovil: controlAutomovil = new controlAutomovil();
    private control_estacionamiento: controlEstacionamiento = new controlEstacionamiento();
    
    constructor() { }

    getAutomoviles(req: Request, res: Response) {
        try {
            let autos: auto[] = this.control_automovil.getAutos();

            if (autos.length === 0) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'No se obtuvieron datos.'
                    }
                });
            }

            res.json({
                ok: true,
                autos
            });
        } catch (err) {
            res.status(500).json({
                ok: false,
                err
            });
        }
    }
    
    addAutomovil(req: Request, res: Response) {
        try {
            let resultadoAuto = this.control_automovil.addAuto();
            let cajon = this.control_estacionamiento.getCajonRecomendado();

            res.json({
                ok: true,
                auto_creado: resultadoAuto.auto,
                autos: resultadoAuto.autos,
                cajon_recomendado: cajon
            });
        } catch (err) {
            return res.status(500).json({
                ok: false,
                err: err
            });
        }
    };
}