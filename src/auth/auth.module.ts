import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PatientAuthService } from "./patient/patient.auth.service";
import { PatientsModule } from "../patients/patients.module";
import { DoctorsModule } from "../doctors/doctors.module";
import { AdminsModule } from "../admins/admins.module";
import { AdminAuthService } from "./admin/admin.auth.service";
import { DoctorAuthService } from "./doctor/doctor.auth.service";
import { StaffAuthService } from "./staff/staff.auth.service";
import { StaffsModule } from "../staffs/staffs.module";
import { PatientAuthController } from "./patient/patient.auth.controller";
import { StaffAuthController } from "./staff/staff.auth.controller";
import { AdminAuthController } from "./admin/admin.auth.controller";
import { DoctorAuthController } from "./doctor/doctor.auth.controller";
import { MailModule } from "../mail/mail.module";

@Module({
  imports: [
    JwtModule.register({}),
    PatientsModule,
    AdminsModule,
    DoctorsModule,
    StaffsModule,
    MailModule,
  ],
  controllers: [
    PatientAuthController,
    DoctorAuthController,
    AdminAuthController,
    StaffAuthController, // ____________________ !
  ],
  providers: [
    PatientAuthService,
    DoctorAuthService,
    AdminAuthService,
    StaffAuthService,
  ],
  exports: [],
})
export class AuthModule {}
