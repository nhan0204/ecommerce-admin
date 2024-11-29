"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cell-action";
import ActiveCell from "@/components/active-cell";

export type BillboardColumn = {
  id: string;
  label: string;
  createdAt: string;
  isHomePage: boolean;
  isDarkLabel: boolean;
  hasLabel: boolean;
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
    cell: ({ row }) => <ActiveCell isActive={row.original.isHomePage} />
  },
  {
    accessorKey: "isDarkLabel",
    header: "DarkLabel",
    cell: ({ row }) => <ActiveCell isActive={row.original.isDarkLabel} />
  },
  {
    accessorKey: "hasLabel",
    header: "HasLabel",
    cell: ({ row }) => <ActiveCell isActive={row.original.hasLabel} />
  },
  {
    accessorKey: "actions",
    header: "Action",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
