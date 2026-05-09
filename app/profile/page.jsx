"use client";

import AuthGuard from "@/components/AuthGuard";
import PageShell from "@/components/PageShell";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/AuthContext";
import { apiFetch } from "@/lib/fetchClient";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function ProfileInner() {
  const { user, refreshUser } = useAuth();
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    address: "",
  });
  const [pwd, setPwd] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
  });
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPwd, setSavingPwd] = useState(false);

  useEffect(() => {
    if (user) {
      setForm({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        email: user.email || "",
        phone_number: user.phone_number || "",
        address: user.address || "",
      });
    }
  }, [user]);

  async function saveProfile(e) {
    e.preventDefault();
    setSavingProfile(true);
    try {
      await apiFetch("/accounts/users/me/", { method: "PATCH", body: form });
      await refreshUser();
      toast.success("Profile updated");
    } catch (err) {
      toast.error(err.message || "Failed to update profile");
    } finally {
      setSavingProfile(false);
    }
  }

  async function changePassword(e) {
    e.preventDefault();
    if (pwd.new_password !== pwd.confirm_password) {
      toast.error("Passwords do not match");
      return;
    }
    setSavingPwd(true);
    try {
      await apiFetch("/accounts/users/change_password/", {
        method: "POST",
        body: pwd,
      });
      toast.success("Password changed");
      setPwd({ old_password: "", new_password: "", confirm_password: "" });
    } catch (err) {
      const msg =
        (err?.data && typeof err.data === "object"
          ? Object.values(err.data).flat().join(" ")
          : null) ||
        err.message ||
        "Failed to change password";
      toast.error(msg);
    } finally {
      setSavingPwd(false);
    }
  }

  if (!user) return null;
  const initials = (user.username || "U").slice(0, 2).toUpperCase();

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <Card className="mb-6 border-primary/20 dark:border-primary/40 bg-gradient-to-r from-primary/5 to-primary/2 dark:from-primary/20 dark:to-primary/10">
        <CardContent className="flex items-center gap-4 p-6">
          <Avatar className="h-16 w-16 border-2 border-primary/20">
            <AvatarImage
              src={user.profile_picture || undefined}
              alt={user.username}
            />
            <AvatarFallback className="bg-primary/10 text-primary font-bold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">
              {user.get_full_name || user.username}
            </h1>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
          <Badge
            variant="secondary"
            className="capitalize bg-primary/10 text-primary border-primary/20"
          >
            👤 {user.role?.replace("_", " ")}
          </Badge>
        </CardContent>
      </Card>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 bg-muted">
          <TabsTrigger
            value="profile"
            className="data-[state=active]:bg-primary/10"
          >
            👤 Profile
          </TabsTrigger>
          <TabsTrigger
            value="password"
            className="data-[state=active]:bg-destructive/10"
          >
            🔐 Password
          </TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <Card className="border-primary/20">
            <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/2">
              <CardTitle className="flex items-center gap-2">
                <span>👤</span> Profile information
              </CardTitle>
              <CardDescription>Update your personal details</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={saveProfile} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first_name" className="font-semibold">
                      First name
                    </Label>
                    <Input
                      id="first_name"
                      value={form.first_name}
                      onChange={(e) =>
                        setForm({ ...form, first_name: e.target.value })
                      }
                      className="border-primary/20 focus:border-primary focus:ring-primary/20"
                      placeholder="John"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last_name" className="font-semibold">
                      Last name
                    </Label>
                    <Input
                      id="last_name"
                      value={form.last_name}
                      onChange={(e) =>
                        setForm({ ...form, last_name: e.target.value })
                      }
                      className="border-primary/20 focus:border-primary focus:ring-primary/20"
                      placeholder="Doe"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="font-semibold">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    className="border-primary/20 focus:border-primary focus:ring-primary/20"
                    placeholder="john@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="font-semibold">
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    value={form.phone_number}
                    onChange={(e) =>
                      setForm({ ...form, phone_number: e.target.value })
                    }
                    className="border-primary/20 focus:border-primary focus:ring-primary/20"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address" className="font-semibold">
                    Address
                  </Label>
                  <Input
                    id="address"
                    value={form.address}
                    onChange={(e) =>
                      setForm({ ...form, address: e.target.value })
                    }
                    className="border-primary/20 focus:border-primary focus:ring-primary/20"
                    placeholder="123 Main St, City, State"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={savingProfile}
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  {savingProfile ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  ✅ Save changes
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="password">
          <Card className="border-destructive/20 bg-destructive/5">
            <CardHeader>
              <CardTitle className="text-destructive">
                🔐 Change password
              </CardTitle>
              <CardDescription>
                Keep your account secure by updating your password regularly
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={changePassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="old" className="font-semibold">
                    Current password
                  </Label>
                  <Input
                    id="old"
                    type="password"
                    value={pwd.old_password}
                    onChange={(e) =>
                      setPwd({ ...pwd, old_password: e.target.value })
                    }
                    required
                    className="border-destructive/30 focus:border-destructive focus:ring-destructive/20"
                    placeholder="Enter your current password"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new" className="font-semibold">
                    New password
                  </Label>
                  <Input
                    id="new"
                    type="password"
                    value={pwd.new_password}
                    onChange={(e) =>
                      setPwd({ ...pwd, new_password: e.target.value })
                    }
                    required
                    minLength={6}
                    className="border-destructive/30 focus:border-destructive focus:ring-destructive/20"
                    placeholder="Minimum 6 characters"
                  />
                  <p className="text-xs text-muted-foreground">
                    Use a mix of uppercase, lowercase, numbers, and symbols
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm" className="font-semibold">
                    Confirm new password
                  </Label>
                  <Input
                    id="confirm"
                    type="password"
                    value={pwd.confirm_password}
                    onChange={(e) =>
                      setPwd({ ...pwd, confirm_password: e.target.value })
                    }
                    required
                    minLength={6}
                    className="border-destructive/30 focus:border-destructive focus:ring-destructive/20"
                    placeholder="Re-enter your new password"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={savingPwd}
                  className="w-full bg-destructive hover:bg-destructive/90"
                >
                  {savingPwd ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  🔒 Update password
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <AuthGuard>
      <PageShell>
        <ProfileInner />
      </PageShell>
    </AuthGuard>
  );
}
