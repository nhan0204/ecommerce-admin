"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Check, X } from "lucide-react";
import CellAction from "./cell-action";

export type ProductColumn = {
  id: string;
  name: string;
  price: string;
  size: string;
  color: string;
  isFeatured: boolean;
  isArchived: boolean;
  isHorizontal: boolean;
  createdAt: string;
  category: string;
};

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "size",
    header: "Size",
  },
  {
    accessorKey: "color",
    header: "Color",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        {row.original.color}
        <div
          className="h-6 w-6 rounded-full border"
          style={{ backgroundColor: row.original.color }}
        />
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    accessorKey: "isArchived",
    header: "Archived",
    cell: ({ row }) =>
      row.original.isArchived ? (
        <Check size={16} className="text-gray-900 font-bold" />
      ) : (
        <X size={16} className="text-gray-900 font-bold" />
      ),
  },
  {
    accessorKey: "isFeatured",
    header: "Featured",
    cell: ({ row }) =>
      row.original.isFeatured ? (
        <Check size={16} className="text-gray-900 font-bold" />
      ) : (
        <X size={16} className="text-gray-900 font-bold" />
      ),
  },
  {
    accessorKey: "isHorizontal",
    header: "Horizontal",
    cell: ({ row }) =>
      row.original.isHorizontal ? (
        <Check size={16} className="text-gray-900 font-bold" />
      ) : (
        <X size={16} className="text-gray-900 font-bold" />
      ),
  },
  {
    accessorKey: "actions",
    header: "Action",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
