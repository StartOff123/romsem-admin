import { IoMdAdd } from 'react-icons/io';

const AddButton = ({
	className,
	...props
}: React.DetailedHTMLProps<
	React.ButtonHTMLAttributes<HTMLButtonElement>,
	HTMLButtonElement
>) => {
	return (
		<button
			{...props}
			className="p-2 bg-green-500 text-white rounded hover:bg-green-600 active:bg-green-500 transition"
		>
			<IoMdAdd size={20} />
		</button>
	);
};

export default AddButton;
