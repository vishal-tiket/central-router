import { redirect } from "next/navigation";

export default function Redirect({ params }) {
  return redirect(`/${params?.["countrycode-language"]}/hotel`);
}
