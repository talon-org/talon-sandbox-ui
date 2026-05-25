'use client';
import { useEffect, useState } from 'react';
import { TablePagination } from '@/components/TalonComponents';

export function TablePaginationDemo() {
  const [mounted, setMounted] = useState(false);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const total = 247;
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <TablePagination
      page={page}
      pageSize={pageSize}
      total={total}
      onPageChange={setPage}
      onPageSizeChange={(s) => { setPageSize(s); setPage(0); }}
      pageSizeOptions={[10, 25, 50]}
    />
  );
}
