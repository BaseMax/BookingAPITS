import { IsString, IsNotEmpty, IsNumber, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CreateNotificationDto {
  @ApiProperty({
    description: 'user id for the notification',
    type: Number,
  })
  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }) => {
    return Number(value);
  })
  userId: number;

  @ApiProperty({
    description: 'title for the notification',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'body for the notification',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  body: string;

  @ApiProperty({
    description: 'device_type for this notificaiton (can be android, ios , webpush)',
    type: String,
  })
  @IsString()
  device_type: string;

  @ApiProperty({
    description: 'notification_token which comes from client side and is unique for each device',
    type: String,
  })
  @IsString()
  notification_token: string;
}
