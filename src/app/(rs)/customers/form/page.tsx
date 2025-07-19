// src/app/(rs)/customers/form/page.tsx

import BackButton from "@/components/ui/BackButton";
import CustomerForm from "./CustomerForm";
import { getCustomer } from "@/lib/queries/getCustomer";
import * as Sentry from "@sentry/nextjs";
import type { Metadata } from "next";

// Define the props for the page component.
// For Server Components, you can define props directly.
interface CustomerFormPageProps {
  searchParams: {
    customerId?: string;
  };
}

// Define the props for the metadata function.
interface GenerateMetadataProps {
  params: { [key: string]: string }; // Even if unused, it's part of the expected signature
  searchParams: {
    customerId?: string;
  };
}

export async function generateMetadata({
  searchParams,
}: GenerateMetadataProps): Promise<Metadata> {
  const { customerId } = searchParams;

  if (!customerId) {
    return { title: "New Customer" };
  }
  return { title: `Edit Customer #${customerId}` };
}

export default async function CustomerFormPage({
  searchParams,
}: CustomerFormPageProps) {
  const { customerId } = searchParams;

  let customer = undefined;

  try {
    if (customerId && customerId !== "New") {
      const parsedId = parseInt(customerId, 10);
      // Ensure parsing is successful before fetching
      if (!isNaN(parsedId)) {
        customer = await getCustomer(parsedId);
      }

      if (!customer) {
        return (
          <>
            <h2 className="text-2xl mb-2">
              Customer ID #{customerId} not found
            </h2>
            <BackButton title="Go Back" variant="default" />
          </>
        );
      }
    }
  } catch (e) {
    if (e instanceof Error) {
      Sentry.captureException(e);
      // Display a user-friendly error message
      return <div>An error occurred while fetching customer data.</div>;
    }
  }

  return <CustomerForm customer={customer} />;
}
