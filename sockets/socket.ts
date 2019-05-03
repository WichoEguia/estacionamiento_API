import { Server, Socket } from 'socket.io';

/**
 * Funcion que se ejecuta cuando un cliente se ha conectado.
 * 
 * @param {Socket} cliente Cliente socket conectado.
 * @param {Server} io Servidor de sockets.
 */
export const clienteConectado = (cliente: Socket, io: Server) => {
    // console.log(`Nuevo Cliente conectado con el id ${cliente.id}.`);
}

/**
 * Funcion que se escucha cuando un cliente se desconecta.
 * 
 * @param {Socket} cliente Cliente socket conectado.
 * @param {Server} io Servidor de sockets.
 */
export const clienteDesconectado = (cliente: Socket, io: Server) => {
    io.on('disconnect', () => {
        // console.log(`Cliente con id ${cliente.id} se ha desconectado.`);
    });
}

/**
 * Funcion que se escucha cuando un hay un cambio en el estacionamiento.
 *
 * @param {Socket} cliente Cliente socket conectado.
 * @param {Server} io Servidor de sockets.
 */
export const actualizaEstacionamiento = (cliente: Socket, io: Server) => {
    cliente.on('actualiza-estacionamiento', (cajon) => {
        io.emit('actualiza-estacionamiento-x2', cajon);
    });
}

/**
 * Funcion que se escucha cuando se elimina la información y
 * necesita recargar las paginas.
 *
 * @param {Socket} cliente Cliente socket conectado.
 * @param {Server} io Servidor de sockets.
 */
export const recargaPagina = (cliente: Socket, io: Server) => {
    cliente.on('recargar', (cajon) => {
        io.emit('recargar-pagina', cajon);
    });
}