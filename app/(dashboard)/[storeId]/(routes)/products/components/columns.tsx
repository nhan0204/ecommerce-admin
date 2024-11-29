"use client";

import ActiveCell from "@/components/active-cell";
import { ColumnDef } from "@tanstack/react-table";
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
    cell: ({ row }) => <ActiveCell isActive={row.original.isArchived} />
  },
  {
    accessorKey: "isFeatured",
    header: "Featured",
    cell: ({ row }) => <ActiveCell isActive={row.original.isFeatured} />
  },
  {
    accessorKey: "isHorizontal",
    header: "Horizontal",
    cell: ({ row }) => <ActiveCell isActive={row.original.isHorizontal} />
  },
  {
    accessorKey: "actions",
    header: "Action",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
