import { IsNotEmpty, IsString } from 'class-validator';

export class SigninAdminDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
