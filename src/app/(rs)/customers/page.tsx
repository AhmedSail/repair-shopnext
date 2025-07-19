import { Metadata } from "next";
import CustomerSearch from "./CustomerSearch";
import { getCustomerSearchResult } from "@/lib/queries/getCustomerSearchResult";
import * as Sentry from "@sentry/nextjs";
import CustomerTable from "./CustomerTable";

export const metadata: Metadata = {
  title: "Customers",
};
type Props = {
  searchParams?: { [key: string]: string };
};

export default async function Customers({ searchParams }: Props) {
  const searchText = searchParams?.searchText ?? "";

  if (!searchText) {
    return <CustomerSearch />;
  }
  //query DB
  const span = Sentry.startInactiveSpan({
    name: "getCustomerSearchResult-1",
  });
  const results = await getCustomerSearchResult(searchText);
  span.end();
  //return results
  return (
    <div>
      <CustomerSearch />
      {results.length ? (
        <CustomerTable data={results} />
      ) : (
        <p className="mt-4">No Results Found</p>
      )}
    </div>
  );
}
