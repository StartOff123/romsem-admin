export interface IColumns {
	key: number;
	dataIndex: string;
	title: string;
}

export interface IDataTable {
	key: number;
	values: {
		[key: string]: any;
	};
}

interface TableProps {
	columns: IColumns[];
	data: IDataTable[];
	isLoading?: boolean;
	skeletonHeight?: number;
	skeletonColCount?: number;
}

const Table = ({
	columns,
	data,
	isLoading,
	skeletonColCount,
	skeletonHeight
}: TableProps) => {
	return (
		<div className="w-full border-[1px] border-zinc-300 rounded-md">
			<table className="w-full">
				<thead className="text-sm bg-blue-500 text-white">
					<tr>
						{columns.map((item) => (
							<th key={item.key} className="p-2 font-medium">
								{item.title}
							</th>
						))}
					</tr>
				</thead>
				{!isLoading && (
					<tbody>
						{data.map((dataItem, i) => (
							<tr
								key={i}
								className="border-b-[1px] border-zinc-300 last:border-none"
							>
								{columns.map((item) => (
									<td
										key={item.key}
										className="text-center relative py-2 text-xs font-medium"
									>
										{dataItem.values[item.dataIndex]}
									</td>
								))}
							</tr>
						))}
					</tbody>
				)}
			</table>
			{isLoading &&
				Array(skeletonColCount)
					.fill(1)
					.map((_, i) => (
						<span
							key={i}
							style={{ height: skeletonHeight }}
							className="w-full bg-zinc-200 border-b-[1px] border-white animate-pulse block"
						></span>
					))}
		</div>
	);
};

export default Table;
