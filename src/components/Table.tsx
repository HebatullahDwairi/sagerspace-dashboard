import { useState } from "react";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  type PaginationState,
} from '@tanstack/react-table'
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Drone } from '../interfaces/Drone'




export default function Table({ data }: {data: Drone[]}) {

  const [pagination, setPagination] = useState<PaginationState>({
    pageSize: 7,
    pageIndex: 0
  });


  const colHelper = createColumnHelper<Drone>()
  const cols = [
    colHelper.accessor('serial_number', {
      cell: info => info.getValue(),
      header: "Serial"
    }),
    colHelper.accessor('last_seen', {
      cell: info => {
        const now = Date.now();
        const droneTime = new Date(info.getValue()).getTime();

        const status = now - droneTime < 2 * 60 * 1000 ? 'online' : 'offline';

        return status;
      },
      header: 'Status'
    }),
    colHelper.accessor('is_dangerous', {
      cell: info => info.getValue()? 'Yes' : 'No',
      header: 'Dangerous?'
    }),
    colHelper.accessor('dangerous_reason', {
      cell: info => info.getValue()? info.getValue() : '-',
      header: 'Danger Reason'
    }),

  ];


  const table = useReactTable({
    data,
    columns: cols,
    getCoreRowModel: getCoreRowModel(),
    columnResizeMode: 'onChange',
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
    }
  })

  return (
    <div className="p-2 flex flex-col justify-between flex-1">
      <table className='w-full'>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id} className='border-b-1 border-gray-300'>
              {headerGroup.headers.map(header => (
                <th key={header.id} className='p-3 text-sm' style={{ width: header.column.getSize() }}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}
              className={`border-b-1 border-gray-200  hover:bg-gray-100 `}>
              {row.getVisibleCells().map(cell => (

                <td key={cell.id}
                  className='p-3 text-sm text-center '>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className=' flex justify-between mt-1 p-2'>
        <p className=' text-sm p-1 border-gray-300  border-1 rounded-md'>
          Page: {pagination.pageIndex + 1} of {table.getPageCount()}
        </p>
        <div className='flex gap-2'>
          <button
            disabled={!table.getCanPreviousPage()}
            onClick={() => { table.previousPage() }}
            className=' border-1 border-gray-300 rounded-md'
          >
            <ChevronLeft 
              size={22} 
              color={table.getCanPreviousPage() ? 'black' : 'gray'} 
            />
          </button>
          <button
            disabled={!table.getCanNextPage()}
            onClick={() => { table.nextPage() }}
            className=' border-1 border-gray-300 rounded-md'
          >
            <ChevronRight 
              size={22} 
              color={table.getCanNextPage() ? 'black' : 'gray'}
            />
          </button>
        </div>
      </div>
    </div>
  )
}
