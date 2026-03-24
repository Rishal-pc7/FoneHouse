import DollarSign from 'lucide-react/dist/esm/icons/dollar-sign';
import Users from 'lucide-react/dist/esm/icons/users';
import ShoppingBag from 'lucide-react/dist/esm/icons/shopping-bag';
import Activity from 'lucide-react/dist/esm/icons/activity';
import { DashboardStatDto } from './dashboard.actions';

const iconMap = {
  DollarSign,
  Users,
  ShoppingBag,
  Activity,
};

export default function DashboardStats({ stats }: { stats: DashboardStatDto[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {stats.map((stat) => {
        const Icon = iconMap[stat.iconName];
        return (
          <div key={stat.name} className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                <Icon className="w-6 h-6" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-emerald-500 font-medium">{stat.change}</span>
              <span className="text-gray-400 ml-2">from last month</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
