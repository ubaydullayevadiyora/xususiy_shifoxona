import { AuthGuard } from './../common/guards/auth.guard';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from "@nestjs/swagger";
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { RoomAssignmentsService } from "./room-assignments.service";
import { CreateRoomAssignmentDto } from "./dto/create-room-assignment.dto";
import { UpdateRoomAssignmentDto } from "./dto/update-room-assignment.dto";
import { StaffGuard } from "../common/guards/staffGuard/staff.guard";

@ApiTags("Xona tayinlashlar")
@Controller("room-assignments")
export class RoomAssignmentsController {
  constructor(
    private readonly roomAssignmentsService: RoomAssignmentsService
  ) {}

  @UseGuards(AuthGuard, StaffGuard)
  @Post()
  @ApiOperation({ summary: "Yangi xona tayinlashni yaratish" })
  @ApiBody({ type: CreateRoomAssignmentDto })
  @ApiResponse({
    status: 201,
    description: "Xona tayinlash muvaffaqiyatli yaratildi.",
  })
  create(@Body() createRoomAssignmentDto: CreateRoomAssignmentDto) {
    return this.roomAssignmentsService.create(createRoomAssignmentDto);
  }

  @UseGuards(AuthGuard, StaffGuard)
  @Get()
  @ApiOperation({ summary: "Barcha xona tayinlashlarni ko'rish" })
  @ApiResponse({
    status: 200,
    description: "Xona tayinlashlar ro'yxati muvaffaqiyatli olishdi.",
  })
  findAll() {
    return this.roomAssignmentsService.findAll();
  }

  @UseGuards(AuthGuard, StaffGuard)
  @Get(":id")
  @ApiOperation({ summary: "ID bo'yicha xona tayinlashni olish" })
  @ApiParam({ name: "id", description: "Xona tayinlash ID" })
  @ApiResponse({
    status: 200,
    description: "Xona tayinlash muvaffaqiyatli olindi.",
  })
  @ApiResponse({ status: 404, description: "Xona tayinlash topilmadi" })
  findOne(@Param("id") id: string) {
    return this.roomAssignmentsService.findOne(+id);
  }

  @UseGuards(AuthGuard, StaffGuard)
  @Patch(":id")
  @ApiOperation({ summary: "Xona tayinlashni yangilash" })
  @ApiParam({ name: "id", description: "Xona tayinlash ID" })
  @ApiBody({ type: UpdateRoomAssignmentDto })
  @ApiResponse({
    status: 200,
    description: "Xona tayinlash muvaffaqiyatli yangilandi.",
  })
  @ApiResponse({ status: 404, description: "Xona tayinlash topilmadi" })
  update(
    @Param("id") id: string,
    @Body() updateRoomAssignmentDto: UpdateRoomAssignmentDto
  ) {
    return this.roomAssignmentsService.update(+id, updateRoomAssignmentDto);
  }

  @UseGuards(AuthGuard, StaffGuard)
  @Delete(":id")
  @ApiOperation({ summary: "Xona tayinlashni o'chirish" })
  @ApiParam({ name: "id", description: "Xona tayinlash ID" })
  @ApiResponse({
    status: 200,
    description: "Xona tayinlash muvaffaqiyatli o'chirildi.",
  })
  @ApiResponse({ status: 404, description: "Xona tayinlash topilmadi" })
  remove(@Param("id") id: string) {
    return this.roomAssignmentsService.remove(+id);
  }
}
