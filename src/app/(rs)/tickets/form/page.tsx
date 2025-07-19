import BackButton from "@/components/ui/BackButton";
import TicketForm from "./ticketForm";
import { getCustomer } from "@/lib/queries/getCustomer";
import { getTickets } from "@/lib/queries/getTickets";
import * as Sentry from "@sentry/nextjs";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Users, init as KindeInit } from "@kinde/management-api-js";

type Props = {
  searchParams: { [key: string]: string | undefined };
};
export async function generateMetadata({ searchParams }: Props) {
  const customerId = searchParams?.customerId;
  const ticketId = searchParams?.ticketId;
  if (!customerId && !ticketId) {
    return { title: "Missing Ticket ID or Customer ID" };
  }
  if (customerId) {
    return { title: `New Ticket for Customer #${customerId}` };
  }
  if (ticketId) {
    return { title: `Edit Ticket #${ticketId}` };
  }
}
export default async function TicketsFormPage({ searchParams }: Props) {
  try {
    const customerId = searchParams?.customerId;
    const ticketId = searchParams.ticketId ?? searchParams.ticketid;
    // 🚫 لا يوجد أي معرف
    if (!ticketId && !customerId) {
      if (!ticketId) {
        return (
          <>
            <h2 className="text-2xl mb-2">
              Ticket ID required to load ticket form
            </h2>
            <BackButton title="Go Back" variant="default" />
          </>
        );
      }
      if (!customerId) {
        return (
          <>
            <h2 className="text-2xl mb-2">
              Ticket ID required to load ticket form
            </h2>
            <BackButton title="Go Back" variant="default" />
          </>
        );
      }
    }

    const { getPermission, getUser } = getKindeServerSession();
    const [managerPermission, user] = await Promise.all([
      getPermission("manager"),
      getUser(),
    ]);
    const isManager = managerPermission?.isGranted;
    // 🧾 حالة تعديل موجودة
    if (customerId) {
      const customer = await getCustomer(parseInt(customerId));
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
      if (!customer.active) {
        return (
          <>
            <h2 className="text-2xl mb-2">
              Customer ID #{customerId} is not active
            </h2>
            <BackButton title="Go Back" variant="default" />
          </>
        );
      }
      if (isManager) {
        KindeInit();
        const { users } = await Users.getUsers();
        const techs = users
          ? users
              .filter((user) => typeof user.email === "string")
              .map((user) => {
                const email = user.email!.toLowerCase();
                return {
                  id: email,
                  description: email,
                };
              })
          : [];
        return <TicketForm customer={customer} techs={techs} />;
      } else {
        return <TicketForm customer={customer} />;
      }
    }
    if (ticketId) {
      const ticket = await getTickets(parseInt(ticketId));
      if (!ticket) {
        return (
          <>
            <h2 className="text-2xl mb-2">Ticket ID #{ticketId} not found</h2>
            <BackButton title="Go Back" variant="default" />
          </>
        );
      }

      const customer = await getCustomer(ticket.customerId);
      if (isManager) {
        KindeInit();
        const { users } = await Users.getUsers();
        const techs = users
          ? users.map((user) => ({ id: user.email!, description: user.email! }))
          : [];
        return <TicketForm customer={customer} ticket={ticket} techs={techs} />;
      } else {
        const isEditable =
          user?.email?.toLowerCase() === ticket.tech.toLowerCase();
        return (
          <TicketForm
            customer={customer}
            ticket={ticket}
            isEditable={isEditable}
          />
        );
      }
    }
  } catch (e) {
    if (e instanceof Error) {
      Sentry.captureException(e);
      throw e;
    }
  }

  // 🌀 حالة غير متوقعة
  return (
    <div>
      <h2 className="text-2xl mb-2">Unknown state</h2>
      <BackButton title="Go Back" variant="default" />
    </div>
  );
}
