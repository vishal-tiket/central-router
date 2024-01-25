import { headers } from "next/headers";
import { CentralRouter } from "../../../../component/CentralRouter";
import Script from "next/script";

export default function Delete() {
  const headersList = headers();
  const referrer = headersList.get("referer");

  return (
    <>
      <Script
        id="car-functions-3"
        dangerouslySetInnerHTML={{
          __html: `function carPayload(payload){
            console.log("inside script carPayload");
            var customEvent = new CustomEvent("customEvent2", {
              detail: { payload },
            });
            document.dispatchEvent(customEvent);
            return JSON.stringify({ payload, val: true });
        }`,
        }}
      />

      <Script
        id="car-functions-2"
        dangerouslySetInnerHTML={{
          __html: `function handleBackPressed(payload){
            console.log("inside script handleBackPressed");
            const customEvent = new CustomEvent("customEvent3", {
              detail: { payload },
            });
            document.dispatchEvent(customEvent);
            return JSON.stringify({ payload, val: true });
        }`,
        }}
      />
      <CentralRouter referrerHeader={referrer} />
    </>
  );
}
