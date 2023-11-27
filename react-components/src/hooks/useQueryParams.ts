'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function useQueryParams<T>() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const urlSearchParams = new URLSearchParams(searchParams?.toString());

  function setQueryParams(params: Partial<T>, refresh = true) {
    Object.entries(params).forEach(([key, value]) => {
      if (value === undefined || value === null) {
        urlSearchParams.delete(key);
      } else {
        urlSearchParams.set(key, String(value));
      }
    });

    const search = urlSearchParams.toString();
    const query = search ? `?${search}` : '';
    if (refresh) {
      router.replace(`${pathname}${query}`);
    } else {
      history.replaceState(null, '', `${pathname}${query}`);
    }
  }

  return { queryParams: searchParams, setQueryParams };
}
