export default interface auto {
    clave: string;
    estacionado: boolean;
    fechaLlegada: Date | number;
    fechaSalida?: Date | number | null;
    cajonRecomendado?: string | null;
    cajonOcupado?: string | null;
}