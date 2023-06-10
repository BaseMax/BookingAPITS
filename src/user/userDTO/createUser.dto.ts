import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CreateUserDto {
  @ApiProperty({
    description: 'name of the user',
    type: Number,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'email of the user',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'password of the user',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  password: string;
  @ApiProperty({
    description: 'is user admin of the system or not',
    type: String,
  })
  @IsBoolean()
  @Transform(({ value }) => {
    return Boolean(value);
  })
  isAdmin: boolean;
}
