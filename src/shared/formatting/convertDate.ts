export const convertDate = (dateString?: string | Date): string => {
    if (!dateString) return '';
    console.log("date", dateString);
    return new Date(dateString).toLocaleDateString("pt-BR");
}