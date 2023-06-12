import { IsString, IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class UpdateUserDto {
  @ApiProperty({
    description: 'name of the user',
    type: Number,
  })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({
    description: 'email of the user',
    type: String,
  })
  @IsString()
  @IsOptional()
  email: string;

  @ApiProperty({
    description: 'password of the user',
    type: String,
  })
  @IsString()
  @IsOptional()
  password: string;
  @ApiProperty({
    description: 'is user admin of the system or not',
    type: String,
  })
  @IsBoolean()
  @Transform(({ value }) => {
    return Boolean(value);
  })
  @IsOptional()
  isAdmin: boolean;
}
