const FORMAT_TOKENS: Record<string, (d: Date) => string> = {
    DD: (d) => String(d.getDate()).padStart(2, '0'),
    MM: (d) => String(d.getMonth() + 1).padStart(2, '0'),
    YYYY: (d) => String(d.getFullYear()),
    YY: (d) => String(d.getFullYear()).slice(-2),
    HH: (d) => String(d.getHours()).padStart(2, '0'),
    mm: (d) => String(d.getMinutes()).padStart(2, '0'),
    ss: (d) => String(d.getSeconds()).padStart(2, '0'),
};

const TOKEN_REGEX = new RegExp(Object.keys(FORMAT_TOKENS).join('|'), 'g');

export const formatDate = (dateString: string, format = 'DD/MM/YYYY HH:mm:ss'): string => {
    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) return '—';

    return format.replace(TOKEN_REGEX, (token) => FORMAT_TOKENS[token](date));
};

export function toDateInputValue(value: string | null | undefined): string {
    if (!value) return '';
    return value.includes('T') ? value.split('T')[0] : value;
}

export function toBackendDate(value: string | null | undefined): string {
    if (!value) return '';
    return value.includes('T') ? value : `${value}T00:00:00`;
}
