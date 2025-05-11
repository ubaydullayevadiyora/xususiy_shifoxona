import { AuthGuard } from './../common/guards/auth.guard';
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
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from "@nestjs/swagger";
import { PrescriptionsService } from "./prescriptions.service";
import { CreatePrescriptionDto } from "./dto/create-prescription.dto";
import { UpdatePrescriptionDto } from "./dto/update-prescription.dto";
import { DoctorGuard } from "../common/guards/doctorGuard/doctor.guard";
import { DoctorOwnershipGuard } from "../common/guards/doctorGuard/doctorOwnership.guard";
import { PatientGuard } from "../common/guards/patientGuard/patient.guard";
import { PatientOwnershipGuard } from "../common/guards/patientGuard/patientOwnership.guard";

@ApiTags("Prescriptions")
@Controller("prescriptions")
export class PrescriptionsController {
  constructor(private readonly prescriptionsService: PrescriptionsService) {}

  @UseGuards(AuthGuard, DoctorGuard)
  @Post()
  @ApiOperation({ summary: "Create a new prescription" })
  @ApiResponse({
    status: 201,
    description: "Prescription successfully created",
  })
  @ApiResponse({ status: 400, description: "Bad request" })
  create(@Body() createPrescriptionDto: CreatePrescriptionDto) {
    return this.prescriptionsService.create(createPrescriptionDto);
  }

  @UseGuards(AuthGuard, DoctorGuard)
  @Get()
  @ApiOperation({ summary: "Get all prescriptions" })
  @ApiResponse({ status: 200, description: "List of all prescriptions." })
  findAll() {
    return this.prescriptionsService.findAll();
  }

  @UseGuards(
    AuthGuard,
    DoctorGuard,
    DoctorOwnershipGuard,
    PatientOwnershipGuard
  )
  @Get(":id")
  @ApiOperation({ summary: "Get a single prescription by ID" })
  @ApiParam({ name: "id", type: "number" })
  @ApiResponse({ status: 200, description: "Prescription details." })
  @ApiResponse({ status: 404, description: "Prescription not found." })
  findOne(@Param("id") id: string) {
    return this.prescriptionsService.findOne(+id);
  }

  @UseGuards(AuthGuard, DoctorOwnershipGuard)
  @Patch(":id")
  @ApiOperation({ summary: "Update a prescription by ID" })
  @ApiParam({ name: "id", type: "number" })
  @ApiResponse({
    status: 200,
    description: "Prescription successfully updated.",
  })
  @ApiResponse({ status: 404, description: "Prescription not found." })
  update(
    @Param("id") id: string,
    @Body() updatePrescriptionDto: UpdatePrescriptionDto
  ) {
    return this.prescriptionsService.update(+id, updatePrescriptionDto);
  }

  @UseGuards(AuthGuard, DoctorOwnershipGuard)
  @Delete(":id")
  @ApiOperation({ summary: "Delete a prescription by ID" })
  @ApiParam({ name: "id", type: "number" })
  @ApiResponse({
    status: 200,
    description: "Prescription successfully deleted.",
  })
  @ApiResponse({ status: 404, description: "Prescription not found." })
  remove(@Param("id") id: string) {
    return this.prescriptionsService.remove(+id);
  }
}
