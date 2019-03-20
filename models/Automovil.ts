import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const AutoSchema = new Schema({
    estacionado: {
        type: Boolean
    },
    llegada: {
        type: Date,
        default: Date.now()
    },
    salida: {
        type: Date,
        default: null
    },
    cajonAsignado: {
        type: String
    }
});

export default mongoose.model('Automovil', AutoSchema);
