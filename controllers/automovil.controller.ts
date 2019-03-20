import { Request, Response } from "express";
import Automovil from "../models/Automovil";

export const getAutomoviles = (req: Request, res: Response) => {
    Automovil.find({}, (err, autos) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (autos.length <= 0) {
            return res.status(400).json({
                ok: false,
                err: { message: 'No se encontraron Autos en BD' }
            });
        }

        res.json({
            ok: true,
            autos
        });
    });
}

export const nuevoAuto = (data: any) => {
    const auto = new Automovil(data);
    auto.save((err: any, autoDB) => {
        if (err) {
            console.error(err);
        };
        
        // console.log(autoDB);
    });
};