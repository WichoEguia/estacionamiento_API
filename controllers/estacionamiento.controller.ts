import { Request, Response } from 'express';
import CajonEstacionamiento from '../models/CajonEstacionamiento';
import Automovil from '../models/Automovil';

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
        let { auto: auto_, cajon: cajon_ } = req.body;

        CajonEstacionamiento.findByIdAndUpdate(
            cajon_._id,
            {
                estatus: "ocupado",
                ocupante: auto_.clave
            },
            { new: true, runValidators: true }
        ).exec((err, cajon) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            if (!cajon) {
              return res.status(400).json({
                ok: false,
                err: {
                    message: "No se encuentra cajon de estacionamiento en base de datos."
                }
              });
            }

            Automovil.findByIdAndUpdate(
                auto_._id,
                {
                    estacionado: true,
                    cajonAsignado: null,
                    cajonOcupado: Object(cajon).clave
                },
                { new: true, runValidators: true }
            ).exec((err, auto) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        err
                    });
                }
    
                if (!auto) {
                    return res.status(400).json({
                        ok: false,
                        err: {
                            message: "No se encuentra auto en base de datos."
                        }
                    });
                }
                
                res.json({
                    ok: true,
                    auto,
                    cajon
                });
            });
        });
    }

    dejarCajonEstacionamiento(req: Request, res: Response) {
        let { auto: auto_, cajon: cajon_ } = req.body;

        CajonEstacionamiento.findByIdAndUpdate(
            cajon_._id,
            {
                estatus: "disponible",
                ocupante: null
            },
            { new: true, runValidators: true }
        ).exec((err, cajon) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            if (!cajon) {
              return res.status(400).json({
                ok: false,
                err: {
                    message: "No se encuentra cajon de estacionamiento en base de datos."
                }
              });
            }

            Automovil.findByIdAndUpdate(
                auto_._id,
                {
                    estacionado: false,
                    cajonAsignado: null,
                    cajonOcupado: null,
                    salida: Date.now()
                },
                { new: true, runValidators: true }
            ).exec((err, auto) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        err
                    });
                }
    
                if (!auto) {
                    return res.status(400).json({
                        ok: false,
                        err: {
                            message: "No se encuentra auto en base de datos."
                        }
                    });
                }
                
                res.json({
                    ok: true,
                    auto,
                    cajon
                });
            });
        });
    }
}