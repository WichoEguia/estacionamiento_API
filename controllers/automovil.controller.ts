import { Request, Response } from "express";
import Automovil from '../models/Automovil';
import CajonEstacionamiento from '../models/CajonEstacionamiento';

export class automovilController {    
    constructor() { }

    getAutomoviles(req: Request, res: Response) {
        Automovil.find().exec((err, autos) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            if (autos.length == 0) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'No se encuentra ningun automovil en base de datos.'
                    }
                });
            }

            res.json({
                ok: true,
                autos
            });
        });
    }
    
    addAutomovil(req: Request, res: Response) {
            CajonEstacionamiento.count(null).exec((err, count) => {
                let idx = Math.floor(Math.random() * count);

                (async () => {
                    try {
                        let cajon = <any>await CajonEstacionamiento.findOne().skip(idx).exec();

                        const auto = new Automovil({
                            clave: `auto-pro-${Date.now()}`,
                            cajonAsignado: cajon.clave
                        });

                        auto.save((err, auto) => {
                            if (err) {
                                return res.status(500).json({
                                    ok: false,
                                    err
                                });
                            }

                            res.json({
                                ok: true,
                                auto
                            });
                        });   
                    } catch (err) {
                        return res.status(500).json({
                            ok: false,
                            err: {
                                message: 'Ha ocurrido un error al obtener el cajón.'
                            }
                        });
                    }
                })();
            });
    };
}