import { Request, Response } from "express";
import auto from "../models/Automovil";
import cajon from "../models/CajonEstacionamiento";
import { controlEstacionamiento } from '../libraries/control-estacionamiento';

export class estacionamientoController {
    private control_estacionamiento: controlEstacionamiento = new controlEstacionamiento();

    constructor() { }

    getEstacionamiento(req: Request, res: Response) {
        try {
            let estacionamiento: cajon[] = this.control_estacionamiento.getEstacionamiento();

            if (estacionamiento.length === 0) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'No se obtuvieron datos.'
                    }
                });
            }

            res.json({
                ok: true,
                estacionamiento
            });
        } catch (err) {
            res.status(500).json({
                ok: false,
                err
            });
        }
    }
}