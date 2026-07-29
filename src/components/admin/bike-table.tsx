"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  MoreHorizontal,
  Edit,
  Trash2,
  Star,
  CheckCircle,
  XCircle,
  Plus,
  Search,
  Filter,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  deleteBikeAction,
  toggleBikeSoldAction,
  toggleBikeFeaturedAction,
  type BikeWithImages,
} from "@/actions/bike-actions";
import { formatPrice, formatOdometer, formatDate } from "@/lib/utils";
import { BIKE_BRANDS, CONDITION_LABELS } from "@/lib/constants";
import { toast } from "sonner";

interface BikeTableProps {
  bikes: BikeWithImages[];
  total: number;
  totalPages: number;
  currentPage: number;
}

export function BikeTable({
  bikes = [],
  total = 0,
  totalPages = 1,
  currentPage = 1,
}: BikeTableProps): React.JSX.Element {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = React.useState(searchParams.get("query") || "");
  const [selectedBrand, setSelectedBrand] = React.useState(searchParams.get("brand") || "all");
  const [statusFilter, setStatusFilter] = React.useState(searchParams.get("status") || "all");

  const [deleteId, setDeleteId] = React.useState<string | null>(null);
  const [isDeleting, setIsDeleting] = React.useState(false);

  // Sync filters to URL search params
  const updateUrl = (params: Record<string, string | number>): void => {
    const newParams = new URLSearchParams(searchParams.toString());
    Object.entries(params).forEach(([key, val]) => {
      if (val === "" || val === "all") {
        newParams.delete(key);
      } else {
        newParams.set(key, String(val));
      }
    });
    router.push(`/admin/bikes?${newParams.toString()}`);
  };

  const handleSearchSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    updateUrl({ query: searchQuery, page: 1 });
  };

  const handleToggleSold = async (id: string, currentSold: boolean): Promise<void> => {
    try {
      const res = await toggleBikeSoldAction(id, !currentSold);
      if (res.success) {
        toast.success(currentSold ? "Bike marked as Available" : "Bike marked as Sold!");
        router.refresh();
      } else {
        toast.error(res.error || "Failed to update status");
      }
    } catch {
      toast.error("Error updating status");
    }
  };

  const handleToggleFeatured = async (id: string, currentFeatured: boolean): Promise<void> => {
    try {
      const res = await toggleBikeFeaturedAction(id, !currentFeatured);
      if (res.success) {
        toast.success(currentFeatured ? "Bike un-featured" : "Bike set as Featured!");
        router.refresh();
      } else {
        toast.error(res.error || "Failed to update status");
      }
    } catch {
      toast.error("Error updating status");
    }
  };

  const handleDeleteConfirm = async (): Promise<void> => {
    if (!deleteId) return;
    setIsDeleting(true);
    try {
      const res = await deleteBikeAction(deleteId);
      if (res.success) {
        toast.success("Bike deleted successfully!");
        setDeleteId(null);
        router.refresh();
      } else {
        toast.error(res.error || "Failed to delete bike");
      }
    } catch {
      toast.error("Error deleting bike");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header & CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">Bike Listings</h1>
          <p className="text-xs text-muted-foreground">Manage your vehicle inventory ({total} total bikes)</p>
        </div>

        <Link href="/admin/bikes/new">
          <Button className="bg-saffron-500 hover:bg-saffron-600 text-white font-semibold gap-2 shadow-sm cursor-pointer">
            <Plus className="h-4 w-4" />
            <span>Add New Bike</span>
          </Button>
        </Link>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 rounded-2xl bg-card border border-border space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          <form onSubmit={handleSearchSubmit} className="flex-1 flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search brand, model, registration #..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button type="submit" variant="secondary" className="gap-2">
              <span>Search</span>
            </Button>
          </form>

          <div className="flex gap-2">
            {/* Status Filter */}
            <Select
              value={statusFilter}
              onValueChange={(val) => {
                const newStatus = val || "all";
                setStatusFilter(newStatus);
                updateUrl({ status: newStatus, page: 1 });
              }}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="sold">Sold</SelectItem>
                <SelectItem value="featured">Featured</SelectItem>
              </SelectContent>
            </Select>

            {/* Brand Filter */}
            <Select
              value={selectedBrand}
              onValueChange={(val) => {
                const newBrand = val || "all";
                setSelectedBrand(newBrand);
                updateUrl({ brand: newBrand, page: 1 });
              }}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Brand" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Brands</SelectItem>
                {BIKE_BRANDS.map((b) => (
                  <SelectItem key={b} value={b}>
                    {b}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Main Data Table */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-card">
        {bikes.length > 0 ? (
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="w-[80px]">Photo</TableHead>
                <TableHead>Bike Details</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Condition</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date Added</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bikes.map((bike) => {
                const coverImage = bike.images[0]?.url || "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=800";

                return (
                  <TableRow key={bike.id}>
                    {/* Thumbnail */}
                    <TableCell>
                      <div className="relative h-12 w-16 rounded-lg overflow-hidden bg-muted">
                        <Image src={coverImage} alt={bike.model} fill className="object-cover" />
                      </div>
                    </TableCell>

                    {/* Bike Title & Specs */}
                    <TableCell>
                      <div className="space-y-0.5">
                        <span className="font-heading font-bold text-sm text-foreground">
                          {bike.year} {bike.brand} {bike.model}
                        </span>
                        <div className="text-xs text-muted-foreground flex gap-2">
                          <span>{formatOdometer(bike.odometer)}</span>
                          <span>•</span>
                          <span>{bike.colour}</span>
                        </div>
                      </div>
                    </TableCell>

                    {/* Price */}
                    <TableCell>
                      <span className="font-heading font-bold text-sm text-foreground">
                        {formatPrice(bike.price)}
                      </span>
                    </TableCell>

                    {/* Condition */}
                    <TableCell>
                      <span className="text-xs font-semibold text-muted-foreground">
                        {CONDITION_LABELS[bike.condition] || bike.condition}
                      </span>
                    </TableCell>

                    {/* Status Badges */}
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {bike.isSold ? (
                          <Badge variant="destructive" className="text-[10px]">
                            SOLD
                          </Badge>
                        ) : (
                          <Badge className="bg-emerald-600 text-white text-[10px]">AVAILABLE</Badge>
                        )}
                        {bike.isFeatured && (
                          <Badge className="bg-gold-500 text-black text-[10px]">FEATURED</Badge>
                        )}
                      </div>
                    </TableCell>

                    {/* Date */}
                    <TableCell className="text-xs text-muted-foreground">
                      {formatDate(new Date(bike.createdAt))}
                    </TableCell>

                    {/* Actions Menu */}
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger
                          render={
                            <Button variant="ghost" size="icon-sm" className="cursor-pointer" />
                          }
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Link href={`/bikes/${bike.slug}`} target="_blank" className="flex items-center gap-2 w-full cursor-pointer">
                              <Eye className="h-4 w-4" />
                              <span>View Public Page</span>
                            </Link>
                          </DropdownMenuItem>

                          <DropdownMenuItem>
                            <Link href={`/admin/bikes/${bike.id}/edit`} className="flex items-center gap-2 w-full cursor-pointer">
                              <Edit className="h-4 w-4" />
                              <span>Edit Listing</span>
                            </Link>
                          </DropdownMenuItem>

                          <DropdownMenuSeparator />

                          <DropdownMenuItem
                            onClick={() => handleToggleSold(bike.id, bike.isSold)}
                            className="flex items-center gap-2 cursor-pointer"
                          >
                            {bike.isSold ? (
                              <>
                                <CheckCircle className="h-4 w-4 text-emerald-600" />
                                Mark as Available
                              </>
                            ) : (
                              <>
                                <XCircle className="h-4 w-4 text-rose-500" />
                                Mark as Sold
                              </>
                            )}
                          </DropdownMenuItem>

                          <DropdownMenuItem
                            onClick={() => handleToggleFeatured(bike.id, bike.isFeatured)}
                            className="flex items-center gap-2 cursor-pointer"
                          >
                            <Star className={`h-4 w-4 ${bike.isFeatured ? "fill-gold-500 text-gold-500" : ""}`} />
                            {bike.isFeatured ? "Un-feature Bike" : "Set as Featured"}
                          </DropdownMenuItem>

                          <DropdownMenuSeparator />

                          <DropdownMenuItem
                            onClick={() => setDeleteId(bike.id)}
                            className="flex items-center gap-2 text-destructive focus:text-destructive cursor-pointer"
                          >
                            <Trash2 className="h-4 w-4" />
                            Delete Bike
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        ) : (
          <div className="p-12 text-center space-y-3">
            <p className="text-base font-semibold text-foreground">No bikes match your filters</p>
            <p className="text-xs text-muted-foreground">Try clearing search terms or adding a new bike listing.</p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchQuery("");
                setSelectedBrand("all");
                setStatusFilter("all");
                router.push("/admin/bikes");
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-2">
          <p className="text-xs text-muted-foreground">
            Page {currentPage} of {totalPages} ({total} items)
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage <= 1}
              onClick={() => updateUrl({ page: currentPage - 1 })}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage >= totalPages}
              onClick={() => updateUrl({ page: currentPage + 1 })}
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Bike Listing?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. All photos associated with this bike will be permanently deleted from Cloudinary.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteId(null)} disabled={isDeleting}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteConfirm} disabled={isDeleting}>
              {isDeleting ? "Deleting..." : "Delete Permanently"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
