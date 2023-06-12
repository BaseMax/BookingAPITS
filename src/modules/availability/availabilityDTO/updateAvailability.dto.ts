import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsArray,
  IsOptional,
  IsDate,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { AvailabilitySlot } from '@prisma/client';

export class UpdateAvailabilityDto {
  @ApiProperty({
    description: 'resource id for the availablity',
    type: Number,
  })
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => {
    return Number(value);
  })
  resourceId: number;

  @ApiProperty({
    description: 'date which availabilities will be set as slots',
    type: Date,
  })
  @IsDate()
  @IsOptional()
  @IsNotEmpty()
  @Transform(({ value }) => {
    return new Date(value);
  })
  date: Date;

  @ApiProperty({
    description:
      'slots which are available on this particular Availability Record',
    type: String,
  })
  @IsOptional()
  @IsArray()
  @Transform(({ value }) => {
    return value.map((each: AvailabilitySlot) => {
      return {
        startTime: new Date(each.startTime.toString()),
        endTime: new Date(each.startTime.toString()),
      };
    });
  })
  slots: AvailabilitySlot[];
}
