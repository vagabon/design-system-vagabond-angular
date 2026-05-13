export const formatDate = (value: string | Date, showTime: boolean = false): string => {
    const date = new Date(value);
    const datePart = date.toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

    if (datePart == 'Invalid Date') {
        return '—';
    }

    if (!showTime) {
        return `${datePart}`;
    }

    const timePart = date.toLocaleTimeString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit',
    });
    return `${datePart} à ${timePart}`;
};

export function toDateInputValue(value: string | null | undefined): string {
    if (!value) return '';
    return value.includes('T') ? value.split('T')[0] : value;
}

export function toBackendDate(value: string | null | undefined): string {
    if (!value) return '';
    return value.includes('T') ? value : `${value}T00:00:00Z`;
}
