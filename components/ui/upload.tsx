import '@uploadthing/react/styles.css';
import { Progress } from 'antd';
import React from 'react';

import { useEdgeStore } from '@/lib/edgestore';

import { Dropzone } from './dropzone';

interface UploadProps {
	onChange: (url?: string) => void;
	value: string | null | undefined;
	endpoint: 'productImage' | 'userAvatarImage';
	error?: boolean;
}

const Upload: React.FC<UploadProps> = ({
	endpoint,
	onChange,
	value,
	error
}) => {
	const [file, setFile] = React.useState<File>();
	const [process, setProcess] = React.useState(0);
	const [isLoading, setIsLoading] = React.useState(false);
	const { edgestore } = useEdgeStore();

	const handleUploadFile = async () => {
		if (file) {
			setIsLoading(true);

			const response = await edgestore[endpoint].upload({
				file,
				onProgressChange: (process) => {
					setProcess(process);
				}
			});

			onChange(response.url);

			setIsLoading(false);
		} else {
			onChange();
		}
	};

	React.useEffect(() => {
		handleUploadFile();
	}, [file]);

	switch (endpoint) {
		case 'productImage':
			return (
				<div className="relative">
					<Dropzone
						width={226}
						height={226}
						value={file || value}
						onChange={(file) => {
							setFile(file);
						}}
					/>
					{isLoading && (
						<span className="absolute top-0 bg-black/30 w-full h-full flex items-center justify-center rounded-md backdrop-blur-sm">
							<Progress
								type="circle"
								percent={process}
								size={60}
								strokeWidth={10}
							/>
						</span>
					)}
				</div>
			);
		case 'userAvatarImage':
			return (
				<div className="relative">
					<Dropzone
						width={150}
						height={150}
						value={file || value}
						onChange={(file) => {
							setFile(file);
						}}
						avatar
						className="min-w-0 rounded-full"
					/>
					{isLoading && (
						<span className="absolute top-0 bg-black/30 w-full h-full flex items-center justify-center rounded-full backdrop-blur-sm">
							<Progress
								type="circle"
								percent={process}
								size={60}
								strokeWidth={10}
							/>
						</span>
					)}
				</div>
			);
	}
};

export default Upload;
