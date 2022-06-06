import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'convertToSpaces'}) //will be use in html

export class ConvertToSpacesPipe implements PipeTransform{

    transform(value: any, character: string): string {
       return value.replace(character, ' ');
    }

}