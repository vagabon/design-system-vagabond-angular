
import { TableDto } from "@ng-vagabond-lab/ng-dsv/ds/table";

export interface ManyToManyDto {
    name: string;
    endPoint: string;
    fields: string;
    order: string;
    orderBy: string;
}

export interface YupValidator {
    type?: string;
    required?: boolean;
    disabled?: boolean;
    hidden?: boolean;
    regexp?: string;
    regexpError?: string;
    email?: boolean;
    min?: number;
    max?: number;
    same?: string;
    sameLabel?: string;
    listId?: boolean;
    array?: boolean;
}

export interface FormDto extends YupValidator {
    name: string;
    label: string;
    className?: string;
    listEndPoint?: string;
    listName?: string;
    m2m?: ManyToManyDto;
    value?: string;
}

export interface AdminTabDto {
    name: string;
    label: string;
    findByChamps: string;
    sortBy: string;
    sortByAsc?: 'asc' | 'desc';
    cells: TableDto[];
    form: FormDto[];
}
export interface AdminTabConfDto {
    max: number;
    tabs: AdminTabDto[];
}
