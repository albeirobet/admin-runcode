import { SelectItem } from 'primeng/api';

export class AppConstants {

    public static get APP_VERSION(): string {
        return '2.0.0';
    }

    public static get URL_IP_ADDRESS(): string {
        return 'https://jsonip.com';
    }

    /**
     * Regex para validacion de email
     */
    public static get REGEX_EMAIL(): string {
        return '[a-zA-Z0-9!#$%&\'*+=?^_`{|}~-]+(?:\\.[a-zA-Z0-9!#$%&\'*+=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])';
    }

    /**
     * Titulo mensaje exito
     */
    public static get SUCCESS_MSG_TITLE(): string {
        return 'ÉXITO';
    }

    /**
     * Titulo mensaje error
     */
    public static get ERROR_MSG_TITLE(): string {
        return 'ERROR';
    }

    /**
     * Rol de usuario generico en el registro
     */
    public static get ROL_GENERIC_USER(): string {
        return 'user';
    }

    /**
     * Lista de tipos de identificacion
     */
    public static get IDENTIFICATION_TYPE_LIST(): SelectItem[] {
        return [
            { label: 'CC', value: 'CEDULA' },
            { label: 'NIT', value: 'NIT' },
            { label: 'CE', value: 'CEDULA EXTRANJERIA' }];
    }

}
