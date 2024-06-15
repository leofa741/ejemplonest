import { PartialType } from '@nestjs/mapped-types';
import { CreateBrandDto } from './create-brand.dto';
import { IsNotEmpty, IsString, Validate, ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';




@ValidatorConstraint({ name: 'isNotBlank', async: false })
class IsNotBlankConstraint implements ValidatorConstraintInterface {
    validate(text: string, args: ValidationArguments) {
        return typeof text === 'string' && text.trim().length > 0;
    }

    defaultMessage(args: ValidationArguments) {
        return 'Model should not be just whitespace';
    }
}

export class UpdateBrandDto extends PartialType(CreateBrandDto) {

    @IsNotEmpty({ message: 'Model should not be empty' })
    @IsString({ message: 'Model should be a string' })
    @Validate(IsNotBlankConstraint, { message: 'Model should not be blank' }   )
    name: string;



}
