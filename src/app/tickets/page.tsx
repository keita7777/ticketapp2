import Link from "next/link";
import prisma from "../../../prisma/db";
import DataTable from "./DataTable";
import { buttonVariants } from "@/components/ui/button";
import Pagenation from "@/components/pagenation";

interface SearchParams {
  page: string;
}

const Tickets = async ({ searchParams }: { searchParams: SearchParams }) => {
  // 1ページに表示させるデータの数
  const pageSize = 10;
  // searchParamsのpageにアクセスして値を取得する
  // クエリパラメータがない場合は1となる
  const page = parseInt(searchParams.page) || 1;
  // データの数を取得する
  const ticketCount = await prisma.ticket.count();

  const tickets = await prisma.ticket.findMany({
    take: pageSize,
    skip: (page - 1) * pageSize,
  });

  return (
    <div>
      <Link
        href="/tickets/new"
        className={buttonVariants({ variant: "default" })}
      >
        New Ticket
      </Link>
      <DataTable tickets={tickets} />
      <Pagenation
        itemCount={ticketCount}
        pageSize={pageSize}
        currentPage={page}
      />
    </div>
  );
};
export default Tickets;
