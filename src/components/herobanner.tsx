import type { ReactNode } from "react";
// export default function HeroBanner({title,description}:{title:string,description:string}) {
export default function HeroBanner({title,description,churchTitle}:{title:ReactNode,description:string,churchTitle?:boolean}) {
    return (
        <section className="bg-gray-100 py-45">
            <div className="container mx-auto px-4">
                {churchTitle ? (
                    <h3 className="text-1l font-bold text-center mb-2">Iglesia un Encuentro con Dios</h3>
                ) : null}
                <h1 className="text-4xl font-bold text-center">{title}</h1>
                <p className="text-lg text-center mt-4">
                    {description}
                </p>
            </div>
        </section>
    );
}