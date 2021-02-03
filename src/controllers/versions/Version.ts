import VersionInfo from "./VersionInfo";

export default class Version {
  public applicationName: string;
  public status: string;
  public committers: object;
  public id: number;
  public versionInfo: VersionInfo;

  constructor(
    id: number,
    applicationName: string,
    status: string,
    committers: object,
    versionInfo: VersionInfo
  ) {
    this.id = id;
    this.applicationName = applicationName;
    this.status = status;
    this.committers = committers;
    this.versionInfo = versionInfo;
  }
}
