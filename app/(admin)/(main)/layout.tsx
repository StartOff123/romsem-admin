'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

import Container from '@/components/container';
import Header from '@/components/header';
import LoadingScreen from '@/components/loading-screen';
import Sidebar from '@/components/sidebar';

import { useAppDispatch, useAppSelector } from '@/hooks/redux-hooks';

import { fetchCurrentUser } from '@/redux/slices/profile-slice';

export default function MainLayout({
	children
}: {
	children: React.ReactNode;
}) {
	const router = useRouter();

	const dispatch = useAppDispatch();
	const { profile, loading } = useAppSelector((state) => state.profileSlice);

	React.useEffect(() => {
		if (profile === null && loading === 'succeeded') router.push('/auth');
		if (loading === 'failed') router.push('/auth');
	}, [profile, loading]);

	React.useEffect(() => {
		dispatch(fetchCurrentUser());
	}, []);

	return (
		<>
			{(loading === 'pending' || loading === 'failed') && profile === null ? (
				<LoadingScreen />
			) : (
				<div className="h-full">
					<div className="fixed w-[250px] h-full z-10">
						<Sidebar />
					</div>
					<div className="w-full pl-[250px]">
						<Header />
						<Container>{children}</Container>
					</div>
				</div>
			)}
		</>
	);
}
