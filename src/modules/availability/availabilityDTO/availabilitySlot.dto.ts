import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class AvailabilitySlotDto {
  @ApiProperty({
    description: 'availability id for the availablity slot',
    type: Number,
  })
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => {
    return Number(value);
  })
  availabilityId: number;

  @ApiProperty({
    description: 'start date of slot',
    type: String,
  })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  startTime: string;

  @ApiProperty({
    description: 'end date of slot',
    type: String,
  })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  endTime: string;
}
