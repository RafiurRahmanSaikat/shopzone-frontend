"use client";

import StarRating from "@/components/StarRating";
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/context/AuthContext";
import { apiFetch } from "@/lib/fetchClient";
import { formatDate } from "@/lib/formatters";
import { Loader2, Pencil, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

export default function ReviewSection({ productId, reviews = [], onChange }) {
  const { user } = useAuth();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [editing, setEditing] = useState(false);
  // Locally hidden review IDs (soft delete UX)
  const [hidden, setHidden] = useState(new Set());

  const myReview = useMemo(() => {
    if (!user) return null;
    return (
      reviews.find((r) => {
        // r.user may be a username string, an object { id, username }, or an id
        const usernameFromReview =
          typeof r.user === "string" ? r.user : r.user?.username;
        const idFromReview =
          typeof r.user === "number"
            ? String(r.user)
            : r.user && typeof r.user === "object"
              ? String(r.user.id || r.user.pk || "")
              : null;

        const matchesUsername =
          usernameFromReview &&
          user.username &&
          String(usernameFromReview) === String(user.username);
        const matchesId =
          idFromReview && String(idFromReview) === String(user.id || user.pk);

        return Boolean(matchesUsername || matchesId);
      }) || null
    );
  }, [reviews, user]);

  // Auto-populate form fields when user's review is available
  useEffect(() => {
    if (myReview) {
      setRating(myReview.rating || 5);
      setComment(myReview.comment || "");
    }
  }, [myReview]);

  // Permission: can the current user modify (edit/delete) this review?
  const canModify = useMemo(() => {
    if (!user || !myReview) return false;
    const isOwner = Boolean(
      String(myReview.user) === String(user.id || user.pk) ||
      (typeof myReview.user === "object" &&
        String(myReview.user.id || myReview.user.pk) ===
          String(user.id || user.pk)) ||
      (typeof myReview.user === "string" && myReview.user === user.username),
    );
    return isOwner || Boolean(user.is_staff || user.role === "admin");
  }, [myReview, user]);

  function startEdit() {
    if (!myReview || !canModify) return;
    setEditing(true);
    setRating(myReview.rating || 5);
    setComment(myReview.comment || "");
    // scroll to form
    setTimeout(() => {
      document
        .getElementById("review-form")
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 50);
  }

  async function submit(e) {
    e.preventDefault();
    if (!user) {
      toast.error("Please sign in to leave a review");
      return;
    }
    if (!comment.trim()) {
      toast.error("Please enter a comment");
      return;
    }
    setSubmitting(true);
    try {
      // Same endpoint handles add + edit (backend overwrites by user)
      await apiFetch(`/products/${productId}/add_review/`, {
        method: "POST",
        body: { rating, comment },
      });
      toast.success(editing ? "Review updated" : "Review added");
      setComment("");
      setRating(5);
      setEditing(false);
      onChange && onChange();
    } catch (err) {
      toast.error(
        err?.data?.detail || err.message || "Failed to submit review",
      );
    } finally {
      setSubmitting(false);
    }
  }

  async function deleteReview() {
    // Backend now supports deleting the current user's review on the same endpoint.
    if (!myReview) return;
    setSubmitting(true);
    try {
      await apiFetch(`/products/${productId}/add_review/`, {
        method: "DELETE",
      });
      // Hide from UI in case the list hasn't refreshed yet.
      setHidden((prev) => new Set(prev).add(myReview.id));
      toast.success("Review removed");
      onChange && onChange();
    } catch (err) {
      toast.error(
        err?.data?.detail || err.message || "Failed to remove review",
      );
    } finally {
      setSubmitting(false);
    }
  }

  const visible = reviews.filter(
    (r) => !hidden.has(r.id) && (r.comment?.trim() || r.rating > 0),
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Reviews ({visible.length})</h2>
      </div>

      {/* Add / Edit form */}
      {user ? (
        <Card id="review-form">
          <CardContent className="p-5">
            <h3 className="mb-3 text-sm font-medium">
              {editing || myReview ? "Update your review" : "Write a review"}
            </h3>
            <form onSubmit={submit} className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">Rating:</span>
                <StarRating
                  value={rating}
                  size={22}
                  interactive
                  onChange={setRating}
                />
              </div>
              <Textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your thoughts about this product..."
                rows={3}
              />
              <div className="flex flex-wrap gap-2">
                <Button type="submit" disabled={submitting}>
                  {submitting ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  {editing || myReview ? "Update review" : "Submit review"}
                </Button>
                {editing && (
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => {
                      setEditing(false);
                      setComment("");
                      setRating(5);
                    }}
                  >
                    Cancel
                  </Button>
                )}
                {myReview && canModify && !editing && (
                  <Button type="button" variant="outline" onClick={startEdit}>
                    <Pencil className="mr-2 h-3.5 w-3.5" />
                    Edit my review
                  </Button>
                )}
                {myReview && canModify && (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        type="button"
                        variant="ghost"
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="mr-2 h-3.5 w-3.5" />
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete review?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will remove your review from this product.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={deleteReview}>
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-5 text-sm text-muted-foreground">
            Please sign in to write a review.
          </CardContent>
        </Card>
      )}

      {/* List */}
      {visible.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No reviews yet. Be the first!
        </p>
      ) : (
        <div className="space-y-3">
          {visible.map((r) => {
            const reviewerName =
              typeof r.user === "string"
                ? r.user
                : r.user?.username || r.user?.email || "User";
            const initials = (reviewerName || "U").slice(0, 2).toUpperCase();
            const mine =
              user &&
              (String(r.user) === String(user.id || user.pk) ||
                reviewerName === user.username);
            return (
              <Card key={r.id}>
                <CardContent className="flex gap-3 p-4">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="text-xs">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-medium">
                        {reviewerName}
                      </span>
                      {mine && (
                        <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-accent-foreground">
                          You
                        </span>
                      )}
                      <StarRating value={r.rating || 0} size={14} />
                      <span className="text-xs text-muted-foreground">
                        {formatDate(r.created_at)}
                      </span>
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-foreground/90">
                      {r.comment}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
