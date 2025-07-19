"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  insertCustomerSchema,
  type insertCustomerSchemaType,
  type selectCustomerSchemaType,
} from "@/zod-schemas/customers";
import { InputWithLabel } from "@/components/inputs/InputeWithLable";
import { CheckboxWithLabel } from "@/components/inputs/CheckboxWithLabel";
import { TextareaWithLabel } from "@/components/inputs/TextareaWithLabel";
import SelectWithLabel from "@/components/inputs/SelectWithLabel";
import { stateArrayObjects } from "@/constants/StateArray";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useAction } from "next-safe-action/hooks";
import { saveCustomerAction } from "@/app/actions/saveCustomerAction";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";
import { DisplayServerActionResponse } from "@/components/DisplayServerActionResponse";
type Props = {
  customer?: selectCustomerSchemaType;
};
export default function CustomerForm({ customer }: Props) {
  const { getPermission, getPermissions, isLoading } = useKindeBrowserClient();
  const isManager = !isLoading && getPermission("manager")?.isGranted;
  const permObj = getPermissions();
  const isAuthorized =
    !isLoading &&
    permObj.permissions.some((per) => per === "Manager" || per === "admin");

  const defaultValues = {
    id: customer?.id ?? 0,
    firstName: customer?.firstName ?? "",
    lastName: customer?.lastName ?? "",
    email: customer?.email ?? "",
    address1: customer?.address1 ?? "",
    address2: customer?.address2 ?? "",
    city: customer?.city ?? "",
    state: customer?.state ?? "",
    zip: customer?.zip ?? "",
    phone: customer?.phone ?? "",
    notes: customer?.notes ?? "",
    active: customer?.active ?? true,
  };
  const form = useForm<insertCustomerSchemaType>({
    mode: "onBlur",
    resolver: zodResolver(insertCustomerSchema),
    defaultValues,
  });
  const {
    execute: executeSave,
    result: saveResult,
    isPending: isSaving,
    reset: resetSaveAction,
  } = useAction(saveCustomerAction, {
    onSuccess({ data }) {
      toast("Event has been created.");
    },
    onError({ error }) {
      toast("Event has been created.");
    },
  });
  async function submitForm(data: insertCustomerSchemaType) {
    // console.log(data);
    executeSave(data);
  }
  return (
    <div className="flex flex-col gap-1 sm:px-8">
      <DisplayServerActionResponse result={saveResult} />
      <div className="text-2xl font-bold">
        <h2>
          {customer?.id ? "Edit" : "New"} Customer Form{" "}
          {customer?.id ? `#${customer?.id}` : "Form"}
        </h2>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submitForm)}
          className="flex flex-col md:flex-row gap-4 md:gap-8"
        >
          <div className="w-full flex flex-col gap-4 max-w-xs">
            <InputWithLabel<insertCustomerSchemaType>
              fieldTitle="First Name"
              nameInSchema="firstName"
            />
            <InputWithLabel<insertCustomerSchemaType>
              fieldTitle="Last Name"
              nameInSchema="lastName"
            />
            <InputWithLabel<insertCustomerSchemaType>
              fieldTitle="Address 1"
              nameInSchema="address1"
            />
            <InputWithLabel<insertCustomerSchemaType>
              fieldTitle="Address 2"
              nameInSchema="address2"
            />
            <InputWithLabel<insertCustomerSchemaType>
              fieldTitle="City"
              nameInSchema="city"
            />
            <SelectWithLabel<insertCustomerSchemaType>
              fieldTitle="State"
              nameInSchema="state"
              data={stateArrayObjects}
            />
          </div>
          <div className="flex flex-col gap-4 w-full max-w-xs ">
            <InputWithLabel<insertCustomerSchemaType>
              fieldTitle="ZIP code"
              nameInSchema="zip"
            />
            <InputWithLabel<insertCustomerSchemaType>
              fieldTitle="Email"
              nameInSchema="email"
            />
            <InputWithLabel<insertCustomerSchemaType>
              fieldTitle="Phone"
              nameInSchema="phone"
            />
            <TextareaWithLabel<insertCustomerSchemaType>
              fieldTitle="Notes"
              nameInSchema="notes"
              className="h-40"
            />
            {isLoading ? (
              <p>Loading...</p>
            ) : isManager && customer?.id ? (
              <CheckboxWithLabel<insertCustomerSchemaType>
                fieldTitle="Active"
                nameInSchema="active"
                message="Yes"
              />
            ) : null}

            <div className="flex gap-2">
              <Button
                type="submit"
                className="w-3/4"
                variant="default"
                title="Save"
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <LoaderCircle className="animate-spin" /> Saving
                  </>
                ) : (
                  "Save"
                )}
              </Button>
              <Button
                type="button"
                variant="destructive"
                title="Reset"
                onClick={() => {
                  form.reset(defaultValues);
                  resetSaveAction();
                }}
              >
                Reset
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
