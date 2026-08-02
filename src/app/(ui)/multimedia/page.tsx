import HeroBanner from "../../../components/herobanner";

export default function Page() {
    return (
        <HeroBanner
            // title={"Bienvenidos a\nIglesia un Encuentro con Dios"}
            title={<>Multimedia</>}
            churchTitle={true}
            description="explora nuestra galería de fotos y videos para revivir momentos especiales y compartir la alegría de nuestra comunidad"
        />
    );
}
        