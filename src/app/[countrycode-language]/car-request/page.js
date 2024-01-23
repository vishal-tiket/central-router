import { headers } from "next/headers";
import { CentralRouter } from "../../../../component/CentralRouter";
import Script from "next/script";

export default function Delete() {
  const headersList = headers();
  const referrer = headersList.get("referer");

  return (
    <>
      <Script id="car-functions">
        {`function carPayload(payload) {
            return {payload: JSON.stringify(payload || {}), dataRecieved: true};
        }`}
        {`window.carPayloadWithWindow = (payload) => {
            return {payload: JSON.stringify(payload || {}), dataRecieved: true};
        }`}
      </Script>
      <CentralRouter referrerHeader={referrer} />
    </>
  );
}
