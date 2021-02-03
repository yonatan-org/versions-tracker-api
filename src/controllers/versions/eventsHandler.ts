import { sendMessageByTypeAndData } from "../../socket";
import Version from "./Version";
// import { VersionStatus } from "./VersionStatus";

const handleEvent = (eventType: string, version: Version) => {
  sendMessageByTypeAndData(eventType, version);
  // sendMessageByTypeAndData(VersionStatus[version.status], version);
};

export default {
  handleEvent,
};
