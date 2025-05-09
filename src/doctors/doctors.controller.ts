import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { DoctorsService } from "./doctors.service";
import { CreateDoctorDto } from "./dto/create-doctor.dto";
import { UpdateDoctorDto } from "./dto/update-doctor.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Doctor } from "./models/doctor.model";

@ApiTags("Doctors") 
@Controller("doctors")
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @ApiOperation({ summary: "Create a new doctor" }) 
  @ApiResponse({ status: 201, description: "Doctor successfully created." }) 
  @ApiResponse({ status: 400, description: "Bad request." })
  @Post()
  create(@Body() createDoctorDto: CreateDoctorDto) {
    return this.doctorsService.create(createDoctorDto);
  }

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

  @ApiOperation({ summary: "Remove a doctor" })
  @ApiResponse({ status: 200, description: "Doctor successfully removed." })
  @ApiResponse({ status: 404, description: "Doctor not found." })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.doctorsService.remove(+id);
  }
}
