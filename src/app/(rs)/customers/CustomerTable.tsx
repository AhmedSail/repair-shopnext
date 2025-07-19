"use client";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { selectCustomerSchemaType } from "@/zod-schemas/customers";
import { useRouter } from "next/navigation";
type Props = {
  data: selectCustomerSchemaType[];
};
export default function CustomerTable({ data }: Props) {
  const route = useRouter();
  const coulmnHeaderArray: Array<keyof selectCustomerSchemaType> = [
    "firstName",
    "lastName",
    "email",
    "phone",
    "city",
    "zip",
  ];
  const ColumnHelper = createColumnHelper<selectCustomerSchemaType>();
  const columns = coulmnHeaderArray.map((cn) =>
    ColumnHelper.accessor(cn, {
      id: cn,
      header: cn[0].toUpperCase() + cn.slice(1),
      cell: (info) => info.getValue(),
    })
  );
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div className="mt-6 rounded-lg overflow-hidden border border-border">
      <Table className="border">
        <TableHeader className="bg-gray-600">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  <div>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              className="cursor-pointer hover:bg-border/25 dark:hover:bg-ring/40"
              onClick={() =>
                route.push(`/customers/form?customerId=${row.original.id}`)
              }
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id} className="border">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
