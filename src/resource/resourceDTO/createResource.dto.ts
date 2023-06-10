import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateResourceDto {
  @ApiProperty({
    description: 'name of the resource',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  name: string;
  @ApiProperty({
    description: 'description for the resourece',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  description: string;
}
