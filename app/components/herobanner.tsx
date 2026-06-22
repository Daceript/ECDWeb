import type { ReactNode } from "react";
// export default function HeroBanner({title,description}:{title:string,description:string}) {
export default function HeroBanner({title,description}:{title:ReactNode,description:string}) {
    return (
        <section className="bg-gray-100 py-45">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-bold text-center">{title}</h1>
                <p className="text-lg text-center mt-4">
                    {description}
                </p>
            </div>
        </section>
    );
}