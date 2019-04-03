import mongoose from 'mongoose';

const estatusCajon = {
    values: ['disponible', 'ocupado']
};

const Schema = mongoose.Schema;
const CajonEstacionamientoSchema = new Schema({
    idx: {
        type: Number
    },
    estatus: {
        type: String,
        enum: estatusCajon,
        default: 'disponible'
    },
    clave: {
        type: String
    },
    ocupante: {
        type: String
    }
});

export default mongoose.model('CajonEstacionamiento', CajonEstacionamientoSchema);
