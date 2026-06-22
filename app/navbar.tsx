"use client";

// import AppBar from '@mui/material/AppBar';
import { useState, type MouseEvent } from 'react';
import { useRouter } from 'next/navigation';
import { AppBar, Toolbar, Typography, Button, Box, Menu, MenuItem } from '@mui/material';
import Image from 'next/image'
import Link from 'next/link';


const navItems = [ 
                    {name: 'Sobre nosotros', type: 'dropdown', items: [{'name': 'Nuestra historia', 'href': '/nuestra-historia'}, {'name': 'Nuestro equipo', 'href': '/nuestro-equipo'}] },
                    {name: 'Calendario', type: 'link', href: '/calendario'},
                    {name: 'MultiMedia', type: 'link', href: '/multimedia'} ];



export default function NavBar() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [dropdownItems, setDropdownItems] = useState<{ name: string; href: string }[]>([]);
    const open = Boolean(anchorEl);

    const handleDropdownOpen = (event: MouseEvent<HTMLElement>, items: { name: string; href: string }[]) => {
        setAnchorEl(event.currentTarget);
        setDropdownItems(items);
    };

    const handleDropdownClose = () => {
        setAnchorEl(null);
        setDropdownItems([]);
    };

    const renderNavItem = (item: { name: string; type: string; href?: string; items?: { name: string; href: string }[] }) => {
        if (item.type === 'link') {
            return (
                <Button key={item.name} color="inherit" href={item.href} sx={{ mx: 1 }}>
                    {item.name}
                </Button>
            );
        }

        return (
            <Button
                key={item.name}
                color="inherit"
                sx={{ mx: 1 }}
                onClick={(event) => handleDropdownOpen(event, item.items ?? [])}
            >
                {item.name}
            </Button>
        );
    };

    const router = useRouter();

    return(
        <nav>
            

        <AppBar
        position="static"
        color="transparent"
        sx={{ bgcolor: 'var(--color-gray-50)' }}
        >
        <Toolbar sx={{ display: 'flex', alignItems: 'center' }}>

            <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
            <Link href="/" passHref>
                <Image src="/logo.png" alt="ECD Logo" width={50} height={50} className="mr-2 cursor-pointer" />
            </Link>
            </Box>

            <Box
            sx={{
                display: { xs: 'none', sm: 'flex' },
                justifyContent: 'center',
                flex: 2,
            }}
            >
            {navItems.map(renderNavItem)}
            <Menu
                id="navbar-dropdown-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleDropdownClose}
            >
                {dropdownItems.map((subItem) => (
                    <MenuItem key={subItem.name} onClick={handleDropdownClose} href={subItem.href}>
                        {subItem.name}
                    </MenuItem>
                ))}
            </Menu>
            </Box>

            <Box sx={{ flex: 1 }} />
        </Toolbar>
        </AppBar>

        </nav>
    )
}