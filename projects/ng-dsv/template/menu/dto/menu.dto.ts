export interface MenuDto {
    content: {
        id: string;
        icon: string;
        text: string;
        url: string;
        role?: string;
    }[];
}
