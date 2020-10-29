export class AccessControlConstants {

    /**
     * Endpoint URL del Microservicio Access Control de Usuarios
     */
    public static get ACCESS_CONTROL_ENDPOINT_URL_USERS(): string {
        //return 'https://access-control-ms.herokuapp.com/api/v1/users/';
        return 'http://localhost:3000/api/v1/users/';
    }

    /**
     * Endpoint URL del Microservicio Access Control de Roles
     */
    public static get ACCESS_CONTROL_ENDPOINT_URL_ROLES(): string {
        //return 'https://access-control-ms.herokuapp.com/api/v1/rol/';
        return 'http://localhost:3000/api/v1/rol/';
    }
}