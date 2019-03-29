export default interface auto {
    clave: string;
    estacionado: boolean;
    fechaLlegada: number;
    fechaSalida?: number | null;
    cajonRecomendado?: string | null;
    cajonOcupado?: string | null;
}