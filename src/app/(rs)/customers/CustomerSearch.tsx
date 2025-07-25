import SearchButton from "@/components/SearchButton";
import { Input } from "@/components/ui/input";
import Form from "next/form";

export default function CustomerSearch() {
  return (
    <Form action="/customers" className="flex gap-2 items-center">
      <Input
        name="searchText"
        type="text"
        className="w-full"
        placeholder="Search Customer"
      />
      <SearchButton />
    </Form>
  );
}
