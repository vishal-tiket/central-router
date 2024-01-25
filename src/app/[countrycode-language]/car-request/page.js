import { headers } from "next/headers";
import { CentralRouter } from "../../../../component/CentralRouter";
import Script from "next/script";

export default function Delete() {
  const headersList = headers();
  const referrer = headersList.get("referer");

  return (
    <>
      <CentralRouter referrerHeader={referrer} />
    </>
  );
}
