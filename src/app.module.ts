import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { PatientsModule } from "./patients/patients.module";
import { AdminsModule } from "./admins/admins.module";
import { DoctorsModule } from "./doctors/doctors.module";
import { StaffsModule } from "./staffs/staffs.module";
import { AppointmentsModule } from "./appointments/appointments.module";
import { LabTestsModule } from "./lab-tests/lab-tests.module";
import { DiagnosesModule } from "./diagnoses/diagnoses.module";
import { PrescriptionsModule } from "./prescriptions/prescriptions.module";
import { PaymentsModule } from "./payments/payments.module";
import { PaymentDetailsModule } from "./payment-details/payment-details.module";
import { RoomsModule } from "./rooms/rooms.module";
import { RoomAssignmentsModule } from "./room-assignments/room-assignments.module";
import { Patient } from "./patients/models/patient.model";
import { Doctor } from "./doctors/models/doctor.model";
import { Admin } from "./admins/models/admin.model";
import { Staff } from "./staffs/models/staff.model";
import { Room } from "./rooms/models/room.model";
import { RoomAssignment } from "./room-assignments/models/room-assignment.model";
import { Prescription } from "./prescriptions/models/prescription.model";
import { Payment } from "./payments/models/payment.model";
import { PaymentDetail } from "./payment-details/models/payment-detail.model";
import { LabTest } from "./lab-tests/models/lab-test.model";
import { Diagnosis } from "./diagnoses/models/diagnosis.model";
import { Appointment } from "./appointments/models/appointment.model";
import { AuthModule } from "./auth/auth.module";
import { ClinicModule } from "./clinic/clinic.module";

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),

    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.PG_HOST,
      port: Number(process.env.PG_PORT),
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DB,
      models: [
        Patient,
        Doctor,
        Admin,
        Staff,
        Room,
        RoomAssignment,
        Prescription,
        Payment,
        PaymentDetail,
        LabTest,
        Diagnosis,
        Appointment,
      ],
      autoLoadModels: true,
      sync: { force: true },
      logging: false,
    }),

    PatientsModule,

    AdminsModule,

    DoctorsModule,

    StaffsModule,

    AppointmentsModule,

    LabTestsModule,

    DiagnosesModule,

    PrescriptionsModule,

    PaymentsModule,

    PaymentDetailsModule,

    RoomsModule,

    RoomAssignmentsModule,

    AuthModule,
    ClinicModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
