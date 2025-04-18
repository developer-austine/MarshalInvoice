import { Suspense } from "react"
import { DashboardBlocks } from "../components/DashboardBlocks"
import { EmptyState } from "../components/EmptyState"
import { InvoiceGraph } from "../components/InvoiceGraph"
import { RecentInvoices } from "../components/RecentInvoices"
import prisma from "../utils/db"
import { requireUser } from "../utils/hooks"
import { signOutAction } from "./actions"
import { Skeleton } from "@/components/ui/skeleton"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from '@vercel/analytics/next';

async function getData(userId: string) {
 const data = await prisma.invoice.findMany({
    where: {
        userId: userId
    },
    select: {
        id: true,
    },
 });

 return data;
}

export default async function DashboardRoute() {
    const session = await requireUser();
    const data = await getData(session.user?.id as string)

    return(
       <>
       {data.length < 1 ? (
        <EmptyState 
            title="No invoices found"
            description="Create an Invoice to see it here!"
            buttontext="Create Invoice"
            href="/dashboard/invoices/create"
         />
       ): (
        <Suspense fallback={<Skeleton className="w-full h-full flex-1" />}>
         <DashboardBlocks />
        <div className="grid gap-4 lg:grid-cols-3 md:gap-8">
            <InvoiceGraph />
            <RecentInvoices />
        </div>
        </Suspense>
       )}
       <SpeedInsights />
       <Analytics />
       </>
    )
}