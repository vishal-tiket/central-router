import { permanentRedirect } from "next/navigation";

export default function Redirect({ params }) {
  return permanentRedirect(`/${params?.["countrycode-language"]}/redirect703`);
}
