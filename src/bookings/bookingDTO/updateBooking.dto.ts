import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsDate,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class UpdateBookingDto {
  @ApiProperty({
    description: 'resource id for the booking',
    type: Number,
  })
  @IsNumber()
  @Transform(({ value }) => {
    return Number(value);
  })
  @IsOptional()
  resourceId: number;

  @ApiProperty({
    description: 'starting time of the booking',
    type: String,
  })
  @IsString()
  @IsOptional()
  startDate: string;

  @ApiProperty({
    description: 'ending time of the booking',
    type: String,
  })
  @IsString()
  @IsOptional()
  endDate: string;
  @ApiProperty({
    description: 'notes for this specific booking',
    type: String,
  })
  @IsString()
  @IsOptional()
  notes: string;
}
