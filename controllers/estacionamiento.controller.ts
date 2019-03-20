import { Request, Response } from "express";
import Estacionamiento from './../models/CajonEstacionamiento';

export const getEstacionamiento = (req: Request, res: Response) => {
    Estacionamiento.find({}, (err, estacionamiento) => {
        if (err) {
          return res.status(500).json({
            ok: false,
            err
          });
        }

        if (estacionamiento.length <= 0) {
          return res.status(400).json({
            ok: false,
            err: { message: "No se encontraron cajones estacionamiento en BD. Ingresa a /genera para generar." }
          });
        }

        res.json({
          ok: true,
          estacionamiento
        });
    });
}