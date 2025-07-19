import { Metadata } from "next";
import TicketSearch from "./TicketSearch";
import { getOpenTickets } from "@/lib/queries/getOpenTickets";
import { getTicketSearchResult } from "@/lib/queries/getTicketSearchResult";
import TicketTable from "./TicketTable";

export const metadata: Metadata = {
  title: "Tickets",
};
type Props = {
  searchParams: { [key: string]: string | undefined };
};
export default async function Tickets({ searchParams }: Props) {
  const searchText = searchParams?.searchText ?? "";

  if (!searchText?.trim()) {
    const results = await getOpenTickets();
    return (
      <>
        <TicketSearch />
        {results.length ? <TicketTable data={results} /> : null}
      </>
    );
  }
  const results = await getTicketSearchResult(searchText);

  return (
    <div>
      <TicketSearch />
      {results.length ? <TicketTable data={results} /> : null}
    </div>
  );
}
