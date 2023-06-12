import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
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
    description: 'user id for the booking',
    type: Number,
  })
  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }) => {
    return Number(value);
  })
  userId: number;

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

  @ApiProperty({
    description:
      'notification token is for each device specific this field would be sent if notification is required this field is optional and if not sent would not operate the notification',
    type: String,
  })
  @IsString()
  @IsOptional()
  notification_token: string;
}
