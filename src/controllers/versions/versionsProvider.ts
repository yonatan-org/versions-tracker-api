import versionsRepository from "../../repositories/versionsRepository";
import appBucketCreator from "./appBucketCreator";
import Version from "./Version";

const createBuckets = (versions: Version[]): Record<string, Array<Version>> => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const buckets: Record<string, Array<Version>> = {};

  versions.forEach((version) => {
    if (!buckets[version.applicationName]) {
      buckets[version.applicationName] = [];
    }

    buckets[version.applicationName].push(version);
  });

  return buckets;
};

const getVersions = async () => {
  const versions = await versionsRepository.findAll();
  const appBuckets = createBuckets(versions);
  for (const applicationName in appBuckets) {
    const versions = appBuckets[applicationName];
    const reducedVersions = appBucketCreator.create(versions);
    appBuckets[applicationName] = reducedVersions;
  }

  return appBuckets;
};

export default {
  getVersions,
};
