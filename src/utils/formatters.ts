import { AddressModel } from '@/models/AddressModel';

export function formatAddress(address: AddressModel): string | null {
  if (!address) return null;

  return [address.addressLine1, address.addressLine2, address.locality, address.city, address.state, address.pinCode]
    .filter((item) => item)
    .join(', ');
}

export function formatTimeRange(start: string, end: string): string {
  let timeRange: string = '';

  if (start) timeRange += `${start} Hrs`;

  if (end) timeRange += ` - ${end} Hrs`;

  return timeRange;
}
