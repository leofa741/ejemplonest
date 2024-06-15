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

export class UpdateCarDto {

    @IsNotEmpty({ message: 'Model should not be empty' })
    @IsString({ message: 'Model should be a string' })
    @Validate(IsNotBlankConstraint)
    readonly brand: string;

    @IsNotEmpty({ message: 'Model should not be empty' })
    @IsString({ message: 'Model should be a string' })
    @Validate(IsNotBlankConstraint)
    readonly model: string;
}



