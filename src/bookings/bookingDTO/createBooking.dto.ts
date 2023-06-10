import { IsString, IsNotEmpty, IsNumber, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CreateBookingDto {
  @ApiProperty({
    description: 'resource id for the booking',
    type: Number,
  })
  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }) => {
    return Number(value);
  })
  resourceId: number;

  @ApiProperty({
    description: 'starting time of the booking',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  startDate: string;

  @ApiProperty({
    description: 'ending time of the booking',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  endDate: string;
  @ApiProperty({
    description: 'notes for this specific booking',
    type: String,
  })
  @IsString()
  notes: string;
}
