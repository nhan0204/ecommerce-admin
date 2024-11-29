"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cell-action";
import ActiveCell from "@/components/active-cell";

export type BillboardColumn = {
  id: string;
  label: string;
  createdAt: string;
  isHomePage: boolean;
};

export const columns: ColumnDef<BillboardColumn>[] = [
  {
    accessorKey: "label",
    header: "Label",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    accessorKey: "isHomePage",
    header: "HomePage",
    cell: ({ row }) => <ActiveCell isActive={row.original.isHomePage}/>
  },
  {
    accessorKey: "actions",
    header: "Action",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
