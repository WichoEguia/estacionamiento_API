import { Request, Response } from "express";
import auto from "../models/Automovil";
import { controlAutomovil } from '../libraries/control-automovil';

export class automovilController {
    private control_automovil: controlAutomovil = new controlAutomovil();
    
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
            let resultado = this.control_automovil.addAuto();

            res.json({
                ok: true,
                auto_creado: resultado.auto,
                autos: resultado.autos
            });
        } catch (err) {
            return res.status(500).json({
                ok: false,
                err: err
            });
        }
    };
}