import { IsString, IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CreateUserDto {
  @ApiProperty({
    description: 'name of the user',
    type: String,
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
    type: Boolean,
    default: false,
  })
  @IsBoolean()
  @Transform(({ value }) => {
    return Boolean(value);
  })
  @IsOptional()
  isAdmin: boolean;

  @ApiProperty({
    description:
      'notification token is for each device specific this field would be sent if notification is required this field is optional and if not sent would not operate the notification',
    type: String,
  })
  @IsString()
  @IsOptional()
  notification_token: string;
}
