export const formatDate = (
    value: string | Date,
    showTime: boolean = false,
    technical: boolean = false,
): string => {
    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return '—';
    }

    if (technical) {
        const pad = (n: number) => String(n).padStart(2, '0');
        return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
    }

    const datePart = date.toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

    if (!showTime) {
        return datePart;
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
