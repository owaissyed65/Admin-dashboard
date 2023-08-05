"use client";

import CellAction from "./cell-Action";

export const columns = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "billboard",
    header: "BillBoard",
    cell:({row})=>row.original.billboardLabel
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "action",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
