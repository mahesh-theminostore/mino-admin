import React from 'react';
import { Metadata } from 'next';
import ShopDetails from '@/components/shops/shop-details';

interface PageProps {
  params: Promise<{ shopId: string }>;
}

export const metadata: Metadata = {
  title: 'Shops | Details',
  description: 'Shop Details',
};

export default async function Shop({ params }: PageProps) {
  const { shopId } = await params;

  return <ShopDetails shopId={shopId} />;
}
