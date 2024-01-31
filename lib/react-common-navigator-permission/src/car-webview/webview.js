import { DEVICE_TYPE_COOKIE } from "../constant";
import { getCookieByName } from "../helper";

const commonPropsForWebview = {
  "contact-picker": {
    phoneNumbers: "phoneNumbers",
    emailAddresses: "emailAddresses",
    name: "givenName",
    organizationName: "organizationName",
    departmentName: "departmentName",
    postalAddress: "postalAddresses",
    birthday: "birthday",
    contactRelations: "contactRelations",
  },
};

const CARProperties = {
  android: {
    ...commonPropsForWebview,
  },
  ios: {
    ...commonPropsForWebview,
    "contact-picker": {
      ...commonPropsForWebview["contact-picker"],
      namePrefix: "namePrefix",
      middleName: "middleName",
      familyName: "familyName",
    },
  },

  web: {
    "contact-picker": {
      phoneNumbers: "tel",
      name: "name",
      emailAddresses: "email",
      postalAddress: "address",
    },
  },
};

export const CARWebview = ({ req, carRequestType, carCallback }) => {
  // handle case if req is empty
  return new Promise((resolve) => {
    let reversedMapForWebviewResponse = {};
    function eventHandler(event) {
      document.removeEventListener("car", eventHandler);
      window.handleResponse = (payload) => {
        return false;
      };

      console.log("event captured by fe", event);
      console.log("event detail captured by fe", event?.detail?.response);
      // let finalResponse = {};
      // for (const key in event?.detail?.response) {
      //   finalResponse[reversedMapForWebviewResponse[key]] =
      //     event?.detail?.response?.[key] || null;
      // }
      // console.log("final response to fe vertical", finalResponse);
      resolve(event?.detail?.response);
    }

    /** add listener for car response */
    document.addEventListener("car", eventHandler);

    /** Provide global function to native */
    window.handleResponse = (payload) => {
      console.log("inside window.handleResponse", payload);

      if (
        payload?.["cross-app-routing-response"]?.["request-type"] ===
        "contact-picker"
      ) {
        /** dispatch event after getting response */
        const customEvent = new CustomEvent("car", {
          detail: { response: payload },
        });
        console.log("event dispatched for FE");
        document.dispatchEvent(customEvent);

        return true;
      }
      console.log(
        "payload does not contain correct car request type contact-picker"
      );
      return false;
    };

    const deviceType = getCookieByName(DEVICE_TYPE_COOKIE) || "android";

    const globalCARPropertiesMap = CARProperties[deviceType]["contact-picker"];
    let props = [];
    for (const property of req) {
      reversedMapForWebviewResponse[
        globalCARPropertiesMap[property] || property
      ] = property;
      props.push(globalCARPropertiesMap[property] || property);
    }

    const carProperties = props.join(",") || "";
    console.log;
    console.log(
      `${window.location.origin}/cross-app-request/contact-picker?car-properties=${carProperties}`
    );

    // generate and redirect to the CAR Url
    window.location.href = `${window.location.origin}/cross-app-request/contact-picker?car-properties=${carProperties}`;
  });
};
