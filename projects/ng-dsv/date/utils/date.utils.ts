export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}`;
}

export function toDateInputValue(value: string | null | undefined): string {
    if (!value) return '';
    return value.includes('T') ? value.split('T')[0] : value;
}

export function toBackendDate(value: string | null | undefined): string {
    if (!value) return '';
    return value.includes('T') ? value : `${value}T00:00:00`;
}