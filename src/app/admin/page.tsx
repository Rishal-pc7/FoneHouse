import { getDashboardStats, getRecentOrders, getTopProducts } from './dashboard.actions';
import DashboardStats from './dashboard-stats';
import Image from 'next/image';

export default async function AdminDashboard() {
  const [stats, recentOrders, topProducts] = await Promise.all([
    getDashboardStats(),
    getRecentOrders(5),
    getTopProducts(5),
  ]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">Overview of your store&apos;s performance.</p>
      </div>

      <DashboardStats stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-800 flex flex-col h-[400px]">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 shrink-0">Recent Activity</h3>
          <div className="flex-1 overflow-y-auto pr-2 space-y-4">
            {recentOrders.length > 0 ? recentOrders.map((order) => (
              <div key={order.id} className="flex justify-between items-center bg-gray-50 dark:bg-zinc-800/50 p-3 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Order #{order.id}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{order.firstName} {order.lastName}</p>
                  <p className="text-xs text-gray-400 mt-1">{new Date(order.created_at).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-900 dark:text-white mb-1">SAR {Math.round(order.totalPrice?.toNumber() ?? 0)}</p>
                  <span className={`text-[10px] px-2 py-1 rounded-full font-medium ${order.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400' : 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400'}`}>
                    {order.status}
                  </span>
                </div>
              </div>
            )) : (
              <div className="flex items-center justify-center h-full text-gray-400">No recent orders</div>
            )}
          </div>
        </div>
        
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-800 flex flex-col h-[400px]">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 shrink-0">Top Products</h3>
          <div className="flex-1 overflow-y-auto pr-2 space-y-4">
            {topProducts.length > 0 ? topProducts.map((product) => (
              <div key={product.id} className="flex items-center gap-4 bg-gray-50 dark:bg-zinc-800/50 p-3 rounded-lg">
                <div className="w-12 h-12 relative rounded-md overflow-hidden bg-white shrink-0 shadow-sm">
                  {product.img ? (
                    <Image src={product.img} alt={product.name} fill className="object-contain p-1" />
                  ) : (
                    <div className="w-full h-full bg-gray-200 dark:bg-zinc-700 flex items-center justify-center text-xs text-gray-400">No img</div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{product.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{product._count.OrderItem} sales</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-bold text-gray-900 dark:text-white">SAR {Math.round(product.price?.toNumber() ?? 0)}</p>
                  <p className={`text-xs ${product.stock > 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                    {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                  </p>
                </div>
              </div>
            )) : (
              <div className="flex items-center justify-center h-full text-gray-400">No products found</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
