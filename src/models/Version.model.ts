import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

export interface IVersionAttributes {
  id?: number;
  applicationName: string;
  committers: string;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
  versionInfo: string;
}

export interface IVersionModel
  extends Model<IVersionAttributes>,
    IVersionAttributes {}

export class Version extends Model<IVersionModel, IVersionAttributes> {}
export type VersionStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): IVersionModel;
};

export function VersionFactory(sequelize: Sequelize): VersionStatic {
  return sequelize.define("versions", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    applicationName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    committers: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    versionInfo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  }) as VersionStatic;
}
