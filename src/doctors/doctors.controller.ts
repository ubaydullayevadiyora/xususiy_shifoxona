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
import { DoctorsService } from "./doctors.service";
import { CreateDoctorDto } from "./dto/create-doctor.dto";
import { UpdateDoctorDto } from "./dto/update-doctor.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Doctor } from "./models/doctor.model";
import { AdminGuard } from "../common/guards/adminGuard/admin.guard";
import { StaffGuard } from "../common/guards/staffGuard/staff.guard";
import { AuthGuard } from "@nestjs/passport";

@ApiTags("Doctors")
@Controller("doctors")
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  // @UseGuards(AdminGuard)
  @ApiOperation({ summary: "Create a new doctor" })
  @ApiResponse({ status: 201, description: "Doctor successfully created." })
  @ApiResponse({ status: 400, description: "Bad request." })
  @Post()
  create(@Body() createDoctorDto: CreateDoctorDto) {
    return this.doctorsService.create(createDoctorDto);
  }

  @UseGuards(StaffGuard)
  @ApiOperation({ summary: "Get all doctors" })
  @ApiResponse({
    status: 200,
    description: "List of all doctors.",
    type: [Doctor],
  })
  @Get()
  findAll() {
    return this.doctorsService.findAll();
  }

  @UseGuards(StaffGuard)
  @ApiOperation({ summary: "Get doctor by id" })
  @ApiResponse({
    status: 200,
    description: "Doctor details found.",
    type: Doctor,
  })
  @ApiResponse({ status: 404, description: "Doctor not found." })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.doctorsService.findOne(+id);
  }

  // @UseGuards(AdminGuard)
  @ApiOperation({ summary: "Update doctor details" })
  @ApiResponse({
    status: 200,
    description: "Doctor details successfully updated.",
    type: Doctor,
  })
  @ApiResponse({ status: 400, description: "Bad request." })
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateDoctorDto: UpdateDoctorDto) {
    return this.doctorsService.update(+id, updateDoctorDto);
  }

  @UseGuards(AdminGuard)
  @ApiOperation({ summary: "Remove a doctor" })
  @ApiResponse({ status: 200, description: "Doctor successfully removed." })
  @ApiResponse({ status: 404, description: "Doctor not found." })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.doctorsService.remove(+id);
  }
}
