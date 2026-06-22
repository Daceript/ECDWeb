"use client";

import { useState, useRef, useEffect, type MouseEvent } from 'react';
import { AppBar, Toolbar, Button, Box } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

const navItems = [
    { name: 'Sobre nosotros', type: 'dropdown', items: [{ name: 'Nuestra historia', href: '/nuestra-historia' }, { name: 'Nuestro equipo', href: '/nuestro-equipo' }] },
    { name: 'Calendario', type: 'link', href: '/calendario' },
    { name: 'MultiMedia', type: 'link', href: '/multimedia' },
];

type DropdownItem = { name: string; href: string };

function DropdownMenu({ label, items }: { label: string; items: DropdownItem[] }) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: globalThis.MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div ref={ref} style={{ position: 'relative', display: 'inline-block' }}>
            <Button
                color="inherit"
                sx={{ mx: 1 }}
                onClick={() => setOpen((prev) => !prev)}
            >
                {label}
            </Button>

            <div
                style={{
                    position: 'absolute',
                    top: 'calc(100% + 4px)',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    minWidth: 180,
                    background: 'white',
                    borderRadius: 8,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
                    overflow: 'hidden',
                    opacity: open ? 1 : 0,
                    pointerEvents: open ? 'auto' : 'none',
                    transition: 'opacity 0.2s ease, transform 0.2s ease',
                    transformOrigin: 'top center',
                    zIndex: 1300,
                }}
            >
                {items.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setOpen(false)}
                        style={{
                            display: 'block',
                            padding: '10px 16px',
                            color: 'inherit',
                            textDecoration: 'none',
                            fontSize: 14,
                            transition: 'background 0.15s ease',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = '#f5f5f5')}
                        onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                    >
                        {item.name}
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default function NavBar() {
    return (
        <nav>
            <AppBar position="static" color="transparent" sx={{ bgcolor: 'var(--color-gray-50)' }}>
                <Toolbar sx={{ display: 'flex', alignItems: 'center' }}>

                    <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                        <Link href="/" passHref>
                            <Image src="/logo.png" alt="ECD Logo" width={50} height={50} className="mr-2 cursor-pointer" />
                        </Link>
                    </Box>

                    <Box sx={{ display: { xs: 'none', sm: 'flex' }, justifyContent: 'center', flex: 2 }}>
                        {navItems.map((item) =>
                            item.type === 'link' ? (
                                <Button key={item.name} color="inherit" href={item.href} sx={{ mx: 1 }}>
                                    {item.name}
                                </Button>
                            ) : (
                                <DropdownMenu key={item.name} label={item.name} items={item.items ?? []} />
                            )
                        )}
                    </Box>

                    <Box sx={{ flex: 1 }} />
                </Toolbar>
            </AppBar>
        </nav>
    );
}
