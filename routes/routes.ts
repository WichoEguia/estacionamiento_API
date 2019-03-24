import { Router } from 'express';
import { automovilController } from './../controllers/automovil.controller'
import * as estacionamiento from './../controllers/estacionamiento.controller';

const router = Router();
const automovil = new automovilController();

router.get('/', (req, res) => {
    res.end('API rest por Luis Eguia.');
});

router.get('/getAutos', (req, res) => automovil.getAutomoviles(req, res));
router.post('/addAuto', (req, res) => automovil.addAutomovil(req, res))

// router.get('/getEstacionamiento', (req, res) => estacionamiento.getEstacionamiento(req, res));

export default router;