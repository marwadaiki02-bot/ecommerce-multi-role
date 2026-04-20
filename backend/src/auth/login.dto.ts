import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'admin', description: 'Nom d’utilisateur' })
  @IsString()
  username!: string;

  @ApiProperty({ example: 'admin123', description: 'Mot de passe (min 6 caractères)' })
  @IsString()
  @MinLength(6)
  password!: string;
}
