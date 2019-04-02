export default interface cajon {
    idx: number;
    estatus: string; // disponible, ocupado
    clave: string | number;
    ocupante: string | null;
}
