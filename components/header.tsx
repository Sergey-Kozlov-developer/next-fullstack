import React from 'react';
import Link from "next/link";
import {connection} from "next/server";
import {auth} from "@/auth";
import {TypographyH3} from "@/components/ui/typography-h3";
import HeaderNav from "@/components/header-nav";

const Header = async () => {
	await connection()
	const session = await auth()
	return (
		<header className='container mx-auto flex items-center p-4'>
			<div className='shrink-0'>
				<TypographyH3>
				<Link href={session?.user ? '/dashboard' : '/'}>ПК сборщик</Link>
				</TypographyH3>
			</div>
			<nav className='min-w-0 flex-1'>
				<HeaderNav session={session} />
			</nav>
		</header>
	);
};

export default Header;