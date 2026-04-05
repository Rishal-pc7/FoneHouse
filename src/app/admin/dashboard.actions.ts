"use server";

import prisma from "@/lib/db";

export type DashboardStatDto = {
  name: string;
  value: string;
  iconName: "DollarSign" | "Users" | "ShoppingBag" | "Activity";
  color: string;
  bg: string;
};

export async function getDashboardStats(): Promise<DashboardStatDto[]> {
  const orderMetrics = await prisma.orders.aggregate({
    where: {
      status: 'PAID',
    },
    _sum: {
      totalPrice: true,
    },
    _count: {
      id: true,
    },
    
  });


  return [
    { name: 'Total Revenue', value: `SAR ${new Intl.NumberFormat("en-SA").format(orderMetrics._sum.totalPrice?.toNumber()||0)}`, iconName: 'DollarSign', color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { name: 'Sales', value: new Intl.NumberFormat("en-SA").format(orderMetrics._count.id||0), iconName: 'ShoppingBag', color: 'text-violet-500', bg: 'bg-violet-500/10' },
  ];
}

export async function getRecentOrders(take: number = 5) {
  return await prisma.orders.findMany({
    take,
    orderBy: {
      created_at: 'desc',
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      totalPrice: true,
      status: true,
      created_at: true,
    },
  });
}

export async function getTopProducts(take: number = 5) {
  const topOrderItems = await prisma.orderItem.groupBy({
    by: ['productId'],
    where: {
      Orders: {
        status: 'PAID',
      },
    },
    _count: {
      productId: true,
    },
    orderBy: {
      _count: {
        productId: 'desc',
      },
    },
    take,
  });

  const productIds = topOrderItems.map((item) => item.productId);

  const products = await prisma.products.findMany({
    where: {
      id: { in: productIds },
    },
  });

  return topOrderItems.map((item) => {
    const product = products.find((p) => p.id === item.productId);
    return {
      ...product!,
      _count: { OrderItem: item._count.productId },
    };
  });
}
