import mongoose from 'mongoose';

const estatusCajon = {
    values: ['disponible', 'asignado', 'ocupado']
};

const Schema = mongoose.Schema;
const CajonEstacionamientoSchema = new Schema({
    estatus: {
        type: String,
        enum: estatusCajon,
        default: 'disponible'
    },
    clave: {
        type: String
    },
    ocupante: {
        type: Schema.Types.ObjectId,
        rel: 'Automovil'
    }
});

export default mongoose.model('CajonEstacionamiento', CajonEstacionamientoSchema);
