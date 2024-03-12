const OrdersCount = () => {
	return (
		<div className="grid grid-cols-2 gap-8 py-8">
			<div>
				<div className="bg-blue-400 rounded-lg py-4 px-6">
					<span className="text-3xl text-white font-bold">43</span>
					<p className="text-white opacity-70 text-sm">Заказ(-ов) за сегодня</p>
				</div>
			</div>
			<div>
				<div>
					<div className="flex items-start gap-1">
						<span className="text-xl text-zinc-400">₽</span>
						<span className="text-3xl font-bold">1245,00</span>
					</div>
					<p className="text-zinc-400 text-sm">Доходы за сегодня</p>
				</div>
			</div>
		</div>
	);
};

export default OrdersCount;
