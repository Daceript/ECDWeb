import HeroBanner from "../../components/herobanner";

export default function Page() {
    return (
        <HeroBanner
            // title={"Bienvenidos a\nIglesia un Encuentro con Dios"}
            title={<>Calendario</>}
            description="mantenganse al tanto de nuestros eventos y actividades a través de nuestro calendario actualizado"
        />
    );
}
        