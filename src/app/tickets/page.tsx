import Link from "next/link";
import prisma from "../../../prisma/db";
import DataTable from "./DataTable";
import { buttonVariants } from "@/components/ui/button";
import Pagenation from "@/components/pagenation";
import StatusFilter from "@/components/StatusFilter";
import { Status, Ticket } from "@prisma/client";

export interface SearchParams {
  status: Status;
  page: string;
  orderBy: keyof Ticket;
}

const Tickets = async ({ searchParams }: { searchParams: SearchParams }) => {
  // 1ページに表示させるデータの数
  const pageSize = 10;
  // searchParamsのpageにアクセスして値を取得する
  // クエリパラメータがない場合は1となる
  const page = parseInt(searchParams.page) || 1;

  const orderBy = searchParams.orderBy ? searchParams.orderBy : "createdAt";

  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  let where = {};

  if (status) {
    where = {
      status,
    };
  } else {
    where = {
      NOT: [
        {
          status: "CLOSED" as Status,
        },
      ],
    };
  }

  // データの数を取得する
  const ticketCount = await prisma.ticket.count({ where });

  const tickets = await prisma.ticket.findMany({
    where,
    orderBy: {
      [orderBy]: "desc",
    },
    take: pageSize,
    skip: (page - 1) * pageSize,
  });

  return (
    <div>
      <div className="flex gap-2">
        <Link
          href="/tickets/new"
          className={buttonVariants({ variant: "default" })}
        >
          New Ticket
        </Link>
        <StatusFilter />
      </div>
      <DataTable tickets={tickets} searchParams={searchParams} />
      <Pagenation
        itemCount={ticketCount}
        pageSize={pageSize}
        currentPage={page}
      />
    </div>
  );
};
export default Tickets;
