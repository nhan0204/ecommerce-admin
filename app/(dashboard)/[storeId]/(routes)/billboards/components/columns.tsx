"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cell-action";
import { Check, X } from "lucide-react";

export type BillboardColumn = {
  id: string;
  label: string;
  createdAt: string;
  isHomePage: boolean,
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
    cell: ({row}) => 
      row.original.isHomePage ? (
        <Check size={16} className="text-gray-900 font-bold" />
      ) : (
        <X size={16} className="text-gray-900 font-bold" />
      ),
  },
  {
    accessorKey: "actions",
    header: "Action",
    cell: ({ row }) => <CellAction data={row.original}/>,
  },
];
