import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsArray,
  IsDate,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { Availability, AvailabilitySlot } from '@prisma/client';

export class CreateAvailabilityDto {
  @ApiProperty({
    description: 'resource id for the availability',
    type: Number,
  })
  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }) => {
    return Number(value);
  })
  resourceId: number;

  @ApiProperty({
    description: 'date which availabilities will be set as slots',
    type: Date,
  })
  @IsDate()
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
  @IsArray()
  @Transform(({ value }) => {
    return value.map((each: AvailabilitySlot) => {
      return {
        startTime: new Date(each.startTime.toString()),
        endTime: new Date(each.endTime.toString()),
      };
    });
  })
  slots: AvailabilitySlot[];
}
