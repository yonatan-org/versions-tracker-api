import Version from "./Version";

const appendIfFound = (response: Version[], func: Function) => {
  const res = func();
  if (res) {
    response.push(res);
  }
};

const create = (appVersions: Version[]) => {
  const response: Version[] = [];
  appendIfFound(response, () =>
    appVersions.find((x) => x.status === "complete")
  );

  if (appVersions[0].status === "complete") {
    return response;
  }

  appendIfFound(response, () =>
    appVersions.find((x) => x.status !== "complete")
  );
  return response;
};

export default {
  create,
};
