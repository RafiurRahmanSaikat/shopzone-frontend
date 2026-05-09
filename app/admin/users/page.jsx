"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { apiFetch } from "@/lib/fetchClient";
import { Trash2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

function roleVariant(role) {
  if (role === "admin") return "default";
  if (role === "store_owner") return "secondary";
  return "outline";
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const load = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      // Combine all pages
      let all = [];
      let url = "/accounts/users";
      let nextPage = page;
      while (url) {
        const data = await apiFetch(
          `${url}${url.includes("?") ? "&" : "?"}page=${nextPage}`,
        );
        const list = Array.isArray(data) ? data : data?.results || [];
        all = all.concat(list);
        if (data?.next) {
          nextPage += 1;
          url = "/accounts/users";
        } else {
          url = null;
        }
        if (nextPage > 20) break; // safety
      }
      setUsers(all);
    } catch (err) {
      toast.error(err.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function handleDelete(id) {
    try {
      await apiFetch(`/accounts/users/${id}/`, { method: "DELETE" });
      toast.success("User deleted");
      load();
    } catch (err) {
      toast.error(err.message || "Failed to delete user");
    }
  }

  const filtered = users.filter((u) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return (
      u.username?.toLowerCase().includes(q) ||
      u.email?.toLowerCase().includes(q) ||
      u.get_full_name?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-8 border-b border-indigo/20 pb-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-indigo-900 dark:text-indigo-100">
              👥 Users
            </h1>
            <p className="mt-2 text-base text-muted-foreground">
              Manage all {filtered.length} registered users on the platform
            </p>
          </div>
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search users by name, email, or username..."
            className="max-w-sm border-indigo/20 dark:border-indigo/40"
          />
        </div>
      </header>

      {loading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-16 w-full rounded-lg" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <Card className="border-indigo/20 dark:border-indigo/40 text-center py-12">
          <p className="text-muted-foreground">
            No users found matching your search.
          </p>
        </Card>
      ) : (
        <Card className="border-indigo/20 dark:border-indigo/40 bg-gradient-to-br from-indigo/5 to-indigo/2 dark:from-indigo/20 dark:to-indigo/10">
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-gradient-to-r from-indigo/5 to-indigo/2 dark:from-indigo/20 dark:to-indigo/10">
                <TableRow className="border-indigo/20 dark:border-indigo/40 hover:bg-indigo/5 dark:hover:bg-indigo/20">
                  <TableHead className="font-bold">User</TableHead>
                  <TableHead className="font-bold">Email</TableHead>
                  <TableHead className="font-bold">Phone</TableHead>
                  <TableHead className="font-bold">Role</TableHead>
                  <TableHead className="text-right font-bold">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((u, idx) => {
                  const initials = (u.username || "U")
                    .slice(0, 2)
                    .toUpperCase();
                  return (
                    <TableRow
                      key={u.id}
                      className="border-indigo/10 dark:border-indigo/20 hover:bg-indigo/5 dark:hover:bg-indigo/20 transition-colors"
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10 border-2 border-indigo/20 dark:border-indigo/40">
                            <AvatarImage
                              src={u.profile_picture || undefined}
                              alt={u.username}
                            />
                            <AvatarFallback className="text-xs font-bold bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300">
                              {initials}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-semibold">
                              {u.get_full_name || u.username}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              @{u.username}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground font-medium">
                        {u.email}
                      </TableCell>
                      <TableCell className="text-muted-foreground font-medium">
                        {u.phone_number || "—"}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={roleVariant(u.role)}
                          className="capitalize font-semibold"
                        >
                          {u.role === "admin" && "🛡️"}{" "}
                          {u.role === "store_owner" && "🏪"}{" "}
                          {u.role === "customer" && "👤"}
                          {u.role?.replace("_", " ")}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-destructive hover:bg-destructive/10"
                              title="Delete user"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                🗑️ Delete user?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                This will permanently remove "@{u.username}" (
                                {u.get_full_name || "User"}) from the platform.
                                This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(u.id)}
                                className="bg-destructive hover:bg-destructive/90"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
