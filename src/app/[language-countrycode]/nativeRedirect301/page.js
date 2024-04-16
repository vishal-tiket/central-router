import { permanentRedirect } from "next/navigation";

export default function Redirect({ params }) {
  return permanentRedirect(`https://m.gatotkaca.tiket.com/hotel`);
}
