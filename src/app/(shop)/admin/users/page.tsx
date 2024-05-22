export const revalidate = 0;

import { Pagination, Title } from "@/components";

import Link from "next/link";
import { IoCardOutline } from "react-icons/io5";
//import { getOrdersByUser } from "../../../actions/order/get-order-by-user";
import { redirect } from "next/navigation";
import {  getPaginatedUsers } from "@/actions";
import { UsersTable } from "./ui/UsersTable";

export default async function OrdersPage() {
  const { users = [], ok } = await getPaginatedUsers();

  if (!ok) {
    redirect("/auth/login");
  }

  return (
    <>
      <Title title="Mantenimiento de usuarios" />

      <div className="mb-10">
        <UsersTable users={users} />

        <Pagination totalPages={1} />
      </div>
    </>
  );
}
