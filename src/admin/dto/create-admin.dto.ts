import {
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  IsEmail,
  IsAlphanumeric,
} from 'class-validator';

export class CreateAdminDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @IsAlphanumeric()
  password: string;

  @IsEmail()
  email: string;
}
