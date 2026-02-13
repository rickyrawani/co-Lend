import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export interface Column<T> {
  key: string;
  label: string;
  render?: (value: any, row: T) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (row: T) => void;
}

export default function DataTable<T extends Record<string, any>>({ columns, data, onRowClick }: DataTableProps<T>) {
  return (
    <div className="border rounded-md overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.key} className={column.className}>
                {column.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center py-8 text-muted-foreground">
                No data available
              </TableCell>
            </TableRow>
          ) : (
            data.map((row, index) => (
              <TableRow 
                key={index} 
                className={onRowClick ? "cursor-pointer hover-elevate" : ""}
                onClick={() => onRowClick?.(row)}
                data-testid={`row-${index}`}
              >
                {columns.map((column) => (
                  <TableCell key={column.key} className={column.className}>
                    {column.render ? column.render(row[column.key], row) : row[column.key]}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    active: "bg-chart-2 text-white",
    pending: "bg-chart-3 text-white",
    completed: "bg-muted text-muted-foreground",
    closed: "bg-muted text-muted-foreground",
    overdue: "bg-chart-3 text-white",
    npa: "bg-destructive text-destructive-foreground",
    failed: "bg-destructive text-destructive-foreground",
    scheduled: "bg-chart-1 text-white",
    defaulted: "bg-destructive text-destructive-foreground",
    expired: "bg-muted text-muted-foreground",
    terminated: "bg-destructive text-destructive-foreground"
  };

  return (
    <Badge className={colors[status] || "bg-muted text-muted-foreground"}>
      {status.toUpperCase()}
    </Badge>
  );
}
