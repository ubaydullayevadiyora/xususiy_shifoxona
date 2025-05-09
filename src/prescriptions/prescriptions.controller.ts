import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from "@nestjs/swagger";
import { PrescriptionsService } from "./prescriptions.service";
import { CreatePrescriptionDto } from "./dto/create-prescription.dto";
import { UpdatePrescriptionDto } from "./dto/update-prescription.dto";

@ApiTags("Prescriptions")
@Controller("prescriptions")
export class PrescriptionsController {
  constructor(private readonly prescriptionsService: PrescriptionsService) {}

  @Post()
  @ApiOperation({ summary: "Create a new prescription" })
  @ApiResponse({
    status: 201,
    description: "Prescription successfully created.",
  })
  @ApiResponse({ status: 400, description: "Invalid data." })
  create(@Body() createPrescriptionDto: CreatePrescriptionDto) {
    return this.prescriptionsService.create(createPrescriptionDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all prescriptions" })
  @ApiResponse({ status: 200, description: "List of all prescriptions." })
  findAll() {
    return this.prescriptionsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a single prescription by ID" })
  @ApiParam({ name: "id", type: "number" })
  @ApiResponse({ status: 200, description: "Prescription details." })
  @ApiResponse({ status: 404, description: "Prescription not found." })
  findOne(@Param("id") id: string) {
    return this.prescriptionsService.findOne(+id);
  }

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
