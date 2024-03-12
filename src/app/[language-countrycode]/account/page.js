import { CentralRouter } from "../../../../component/CentralRouter";
import { headers } from "next/headers";

export default function MyAccount() {
  const headersList = headers();
  const referrer = headersList.get("referer");

  return <CentralRouter referrerHeader={referrer} />;
}
