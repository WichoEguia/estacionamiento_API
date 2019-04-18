import express from 'express';
import socketIO from 'socket.io';
import http from 'http';

// Importando funciones del archivo socket.ts
import * as socket from '../sockets/socket';

export default class Server {
    private static _instance: Server;

    public port: number;
    public app: express.Application;

    public io: socketIO.Server;
    private httpServer: http.Server;

    private constructor() {
        // Se hace que el constructor sea private para que al
        // llamar el servidor no reinicie el socket
        this.port = Number(process.env.PORT);
        this.app = express();

        // Para trabajar con socket.io se necesita un servidor http.
        // Para ello se crea un servidor http pasandole el servidor de express ya existente.
        this.httpServer = new http.Server(this.app);
        this.io = socketIO(this.httpServer);

        this.escucharSockets();
    }
    
    /**
     * Se crea una funcion para obtener la instancia del servidor si ya existe.
     * Si no existe instancia del servidor, se creara una nueva instancia.
     * 
     * @returns {Server} Instancia de la clase server.
     */
    public static get instance(): Server {
        return this._instance || (this._instance = new Server());
    }

    /**
     * Funcion encargada de escuchar todos los eventos de sockets.s
     */
    private escucharSockets() {
        this.io.on('connection', cliente => {
            // Conectar cliente.
            socket.clienteConectado(cliente, this.io);

            // Desconectar cliente.
            socket.clienteDesconectado(cliente, this.io);

            // Actualizar estacionamiento.
            socket.actualizaEstacionamiento(cliente, this.io);
        });
    }

    /**
     * Levanta el servidor en el puerto especificado en el archivo de configuración.
     * 
     * @param {Function} callback Funcion que se llamara cuando se levante el servidor.
     */
    start(callback: Function) {
        this.httpServer.listen(this.port, callback);
    }
}