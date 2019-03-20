import { Router } from 'express';
import Server from '../classes/Server';
import CajonEstacionamiento from '../models/CajonEstacionamiento';
import * as automovil from './../controllers/automovil.controller'
import * as estacionamiento from './../controllers/estacionamiento.controller';

const router = Router();

router.get('/', (req, res) => {
    res.end('API rest por Luis Eguia.');

    for (let i = 0; i < 10; i++) {
        let cajon = new CajonEstacionamiento({ ocupado: false});
        cajon.save((err, cajon) => {
            if (err) throw err;
        });
    }
});

router.get('/genera', (req, res) => {
    CajonEstacionamiento.deleteMany({}, () => {
        for (let i = 0; i < 20; i++) {
            let cajon = new CajonEstacionamiento({
                estatus: 'disponible',
                clave: `CajonPro${i}`,
                ocupante: null
            });
            cajon.save((err, cajon) => {
                if (err) throw err;
            });
        }

        res.send("Estacionamiento creado");
    });
});

router.get('/getAutos', (req, res) => automovil.getAutomoviles(req, res));

router.get('/getEstacionamiento', (req, res) => estacionamiento.getEstacionamiento(req, res));

export default router;