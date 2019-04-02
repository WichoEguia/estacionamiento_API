import { Request, Response } from "express";
import auto from "../models/Automovil";
import cajon from "../models/CajonEstacionamiento";
import { controlEstacionamiento } from '../libraries/control-estacionamiento';
import { controlAutomovil } from '../libraries/control-automovil';

export class estacionamientoController {
    private control_estacionamiento: controlEstacionamiento = new controlEstacionamiento();
    private control_automovil: controlAutomovil = new controlAutomovil();

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

    ocuparCajonEstacionamiento(req: Request, res: Response) {
        try {
            let respuesta_cajon = <any>this.control_estacionamiento.ocuparCajon(req.body.cajon, req.body.auto);
            if (!respuesta_cajon) {
                return res.status(500).json({
                    ok: false,
                    err: {
                        message: 'No se actualizó cajón.'
                    }
                });
            }

            let respuesta_auto = <any>this.control_automovil.cambiaEstadoAuto(req.body.cajon, req.body.auto, 'ocupar-cajon');
            if (!respuesta_auto) {
                return res.status(500).json({
                    ok: false,
                    err: {
                        message: 'No se actualizó auto.'
                    }
                });
            }

            res.json({
                ok: true,
                respuesta_cajon,
                respuesta_auto
            });
        } catch (err) {
            res.status(500).json({
                ok: false,
                err
            });
        }
    }
}