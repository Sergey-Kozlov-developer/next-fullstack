'use client'
import React from 'react';
import {Session} from "next-auth";
import {usePathname} from "next/navigation";
import {getTabValue} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {LayoutList, Plus, Users} from "lucide-react";
import {signOut} from "next-auth/react";

type Props = {
	session: Session | null;

}

const HeaderNav = ({session}: Props) => {
	const pathname = usePathname()
	const tabValue = getTabValue(pathname)
	if (!session?.user) {
		return (
			<div className='flex justify-end'>
				<Button variant='secondary'>
					<Link href='/login'>Войти</Link>
				</Button>
			</div>
		)
	}
	return (
		<div className='grid grid-cols-3 items-center gap-4'>
			<div></div>
			<div className='flex justify-center'>
				<Tabs value={tabValue} className='w-fit'>
					<TabsList>
						<TabsTrigger value='dashboard' asChild>

							<Link href='/dashboard'>
								<Plus className='w-4 h-4'/>
								Создать сборку
							</Link>
						</TabsTrigger>
						<TabsTrigger value='builds' asChild>

							<Link href='/builds'>
								<LayoutList className='w-4 h-4'/>
								Мои сборки
							</Link>
						</TabsTrigger>
						<TabsTrigger value='explore' asChild>

							<Link href='/builds/explore'>
								<Users className='w-4 h-4'/>
								Публичные сборки
							</Link>
						</TabsTrigger>
					</TabsList>
				</Tabs>
			</div>
			<div className='flex justify-end'>
				<Button variant='ghost'
					size='sm'
					type='button'
					onClick={() => signOut({redirectTo: '/'})}>Выйти</Button>
			</div>
		</div>
	);
};

export default HeaderNav;