import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const AutoSchema = new Schema({
    clave: {
        type: String,
        required: true
    },
    estacionado: {
        type: Boolean,
        default: false
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
        type: String,
        default: null
    },
    cajonOcupado: {
        type: String,
        default: null
    }
});

export default mongoose.model('Automovil', AutoSchema);
