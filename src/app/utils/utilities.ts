export class Utilities {

    static getFormattedDate(dateToProcess): string {
        const auxDate = new Date(dateToProcess);
        const year = auxDate.getFullYear();
        const month = auxDate.getMonth();
        const day = auxDate.getDate();
        var formattedEndDate = new Date(year,month,day).toISOString().split('T')[0];
        return formattedEndDate;
    }

    static getFormattedFinalDate(dateToProcess): string {
        const auxDate = new Date(dateToProcess);
        const year = auxDate.getFullYear();
        const month = auxDate.getMonth();
        const day = auxDate.getDate()+1;
        var formattedEndDate = new Date(year,month,day).toISOString().split('T')[0];
        return formattedEndDate;
    }
    
}
