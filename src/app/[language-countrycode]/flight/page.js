import { headers } from "next/headers";
import { CentralRouter } from "../../../../component/CentralRouter";

export default function Flight() {
  const headersList = headers();
  const referrer = headersList.get("referer");
  return <CentralRouter referrerHeader={referrer} />;
}
