import { Pipe, PipeTransform } from '@angular/core';
import { formatDate } from '../public-api';

@Pipe({
    name: 'formatDate',
    standalone: true,
})
export class DateFormatPipe implements PipeTransform {
    transform(value: string): string {
        return formatDate(value);
    }
}
