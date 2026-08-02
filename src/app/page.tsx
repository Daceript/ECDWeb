import Image from "next/image";
import HeroBanner from "../components/herobanner";

export default function Home() {
  return (
    <HeroBanner
      // title={"Bienvenidos a\nIglesia un Encuentro con Dios"}
      title={<>Bienvenidos a <br />Iglesia un Encuentro con Dios</>}
      description="Donde todos somos una sola familia en Cristo Jesus"
    />
  );
}
