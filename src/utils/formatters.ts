import { AddressModel } from '@/models/AddressModel';

export function formatAddress(address: AddressModel): string | null {
  if (!address) return null;

  return [
    address.address_line_1,
    address.address_line_2,
    address.locality,
    address.city,
    address.state,
    address.pin_code,
  ]
    .filter((item) => item)
    .join(', ');
}

export function formatTimeRange(start: string, end: string): string {
  let timeRange: string = '';

  if (start) timeRange += `${start} Hrs`;

  if (end) timeRange += ` - ${end} Hrs`;

  return timeRange;
}
