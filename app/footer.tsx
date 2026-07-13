import { Divider } from '@mui/material';
import Link from 'next/link';
import { Facebook, Instagram, Youtube } from 'react-bootstrap-icons';

function SocialButtons() {
    const socials = [
        { name: 'Facebook', href: 'https://facebook.com', icon: Facebook, color: 'bg-blue-600', hover: 'hover:bg-blue-700' },
        { name: 'Instagram', href: 'https://instagram.com', icon: Instagram, color: 'bg-pink-600', hover: 'hover:bg-pink-700' },
        { name: 'Youtube', href: 'https://youtube.com', icon: Youtube, color: 'bg-red-600', hover: 'hover:bg-red-700' }
    ];

    return (
        <div className="flex gap-4 items-center justify-center">
            {socials.map((social) => {
                const IconComponent = social.icon;
                return (
                    <Link
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center justify-center p-1 text-white ${social.hover} transition`}
                            // className={`flex items-center justify-center p-1 rounded-full ${social.color} text-white ${social.hover} transition`}
                        aria-label={social.name}    
                    >
                        <IconComponent size={24} />
                    </Link>
                );
            })}
        </div>
    );
}

export default function Footer() {
    const currentYear = new Date().getFullYear();
    
    return(
        <footer className="bg-[#1A1A1A] text-white p-4 mt-auto flex flex-col items-center justify-center">
            <Divider className="w-full mb-4">
                <SocialButtons />
            </Divider>
            <p className="text-center">&copy; {currentYear} Iglesia un Encuentro con Dios. All rights reserved.</p>
        </footer>
    )
}