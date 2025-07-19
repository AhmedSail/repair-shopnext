import {
  Column,
  ColumnDef,
  ColumnFiltersState,
  RowData,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { DebouncedInput } from "./DebouncedInput";
type Props<T> = {
  column: Column<T, unknown>;
};
export default function Filter<T>({ column }: Props<T>) {
  const columnFilterValue = column.getFilterValue();
  const storedUniqeValues = Array.from(
    column.getFacetedUniqueValues().keys()
  ).sort();
  return (
    <>
      <datalist id={column.id + "list"}>
        {storedUniqeValues.map((s, i) => (
          <option value={s} key={i} />
        ))}
      </datalist>
      <DebouncedInput
        className="w-full border shadow rounded bg-card px-5 py-2 outline-0 mt-2"
        onChange={(value) => column.setFilterValue(value)}
        placeholder={`Search... (${
          [...column.getFacetedUniqueValues()].filter((arr) => arr[0]).length
        })`}
        type="text"
        value={(columnFilterValue ?? "") as string}
        list={column.id + "list"}
      />
    </>
  );
}
