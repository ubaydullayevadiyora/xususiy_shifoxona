import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsEnum, IsPositive, IsIn } from "class-validator";
import { RoomStatusEnum, RoomTypeEnum } from "../../app.constants";

export class CreateRoomDto {
  @ApiProperty({ example: 101, description: "Xonaning raqami" })
  @IsInt()
  @IsPositive()
  room_number: number;

  @ApiProperty({
    enum: RoomTypeEnum,
    description:
      "Xonaning turi (masalan, yotoqxona, operatsion xona va boshqalar)",
    example: RoomTypeEnum.GENERAL,
  })
  @IsEnum(RoomTypeEnum)
  room_type: RoomTypeEnum;

  @ApiProperty({
    enum: RoomStatusEnum,
    description: "Xonaning holati (masalan, band yoki bo'sh)",
    example: RoomStatusEnum.OCCUPIED,
  })
  @IsEnum(RoomStatusEnum)
  status: RoomStatusEnum;

  @ApiProperty({ example: 3, description: "Xonaning qavat raqami" })
  @IsInt()
  @IsPositive()
  floor: number;
}
