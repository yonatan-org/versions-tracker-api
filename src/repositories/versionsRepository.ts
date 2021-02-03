import Version from "../controllers/versions/Version";
import { VersionModel } from "../models";
import { IVersionAttributes, IVersionModel } from "../models/Version.model";

function ConvertToDto(domain: Version): IVersionAttributes {
  return {
    // id: domain.id ? domain.id : null,
    applicationName: domain.applicationName,
    committers: JSON.stringify(domain.committers),
    status: domain.status,
    versionInfo: JSON.stringify(domain.versionInfo),
  };
}

function ConvertToDomain(dto: IVersionModel): Version {
  return new Version(
    dto.id,
    dto.applicationName,
    dto.status,
    JSON.parse(dto.committers),
    JSON.parse(dto.versionInfo)
  );
}

const get = async (id: number): Promise<Version> => {
  const dto = await VersionModel.findOne({ where: { id: id } });
  return ConvertToDomain(dto);
};

const save = (version: Version) => {
  return VersionModel.create(ConvertToDto(version));
};

const findAll = async (): Promise<Version[]> => {
  const response = await VersionModel.findAll({
    raw: true,
    order: [
      ["createdAt", "DESC"],
      ["applicationName", "ASC"],
      ["status", "ASC"],
    ],
  });

  return response.map(ConvertToDomain);
};

export default {
  get,
  save,
  findAll,
};
