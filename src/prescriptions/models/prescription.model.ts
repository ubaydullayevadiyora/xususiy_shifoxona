import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Diagnosis } from "../../diagnoses/models/diagnosis.model";

interface IPrescriptionCreationAttr {
  diagnosis_id: number;
  medicines: string;
  dosage: string;
  instructions: string;
}

@Table({ tableName: "prescription" }) 
export class Prescription extends Model<
  Prescription,
  IPrescriptionCreationAttr
> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ForeignKey(() => Diagnosis) 
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare diagnosis_id: number;

  @Column({
    type: DataType.STRING(50),
  })
  declare medicines: string;

  @Column({
    type: DataType.STRING(50),
  })
  declare dosage: string;

  @Column({
    type: DataType.STRING(50),
  })
  declare instructions: string;

  @BelongsTo(() => Diagnosis) 
  diagnosis: Diagnosis;
}
