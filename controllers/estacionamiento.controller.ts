import { Request, Response } from 'express';
import CajonEstacionamiento from '../models/CajonEstacionamiento';

export class estacionamientoController {
    constructor() { }

    getEstacionamiento(req: Request, res: Response) {
        CajonEstacionamiento.find({}).exec((err, estacionamiento) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            if (estacionamiento.length == 0) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'No se encuentra ningun cajon de estacionamiento en base de datos.'
                    }
                });
            }

            res.json({
                ok: true,
                estacionamiento
            });
        });
    }

    ocuparCajonEstacionamiento(req: Request, res: Response) {
        
    }
}