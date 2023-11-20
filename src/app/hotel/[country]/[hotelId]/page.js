import { CentralRouter } from "../../../../../component/CentralRouter";

export default function HotelPDP({ params }) {
  return (
    <div>
      <h2>Country - {params?.country}</h2>
      <h2>Hotel ID - {params?.hotelId}</h2>
      <CentralRouter />
    </div>
  );
}
