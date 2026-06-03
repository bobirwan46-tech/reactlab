import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
} from "../services/api";

import { useAuth } from "../context/AuthContext";

const DEFAULT_PAGINATION = {
  page: 1,
  limit: 10,
  total: 0,
  totalPages: 1,
};

export default function APILab() {
  const { token, isAuthenticated, user } = useAuth();

  const isAdmin = user?.role === "admin";

  const [posts, setPosts] = useState([]);
  const [pagination, setPagination] = useState(DEFAULT_PAGINATION);
  const [page, setPage] = useState(1);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [sort, setSort] = useState("newest");

  const [editingPost, setEditingPost] = useState(null);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  async function fetchPosts(searchValue = debouncedSearch) {
    try {
      setLoading(true);
      setError("");

      const result = await getPosts(
        searchValue,
        sort,
        page,
        pagination?.limit || 10
      );

      const safePosts = Array.isArray(result)
        ? result
        : result?.data || result?.posts || [];

      const safePagination = result?.pagination || {
        ...DEFAULT_PAGINATION,
        page,
        total: safePosts.length,
        totalPages: 1,
      };

      setPosts(safePosts);

      setPagination({
        ...DEFAULT_PAGINATION,
        ...safePagination,
      });
    } catch (error) {
      console.error(error);
      setError(error.message || "Failed to load posts.");
      setPosts([]);
      setPagination(DEFAULT_PAGINATION);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    setPage(1);
  }, [sort]);

  useEffect(() => {
    fetchPosts(debouncedSearch);
  }, [debouncedSearch, sort, page]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!isAuthenticated) {
      setError("Please login first before creating or editing posts.");
      return;
    }

    if (!title.trim() || !body.trim()) {
      setError("Please enter both title and body.");
      return;
    }

    try {
      setSaving(true);
      setSuccess("");
      setError("");

      if (editingPost) {
        await updatePost(editingPost.id, { title, body }, token);
        setSuccess("Post updated successfully.");
      } else {
        await createPost({ title, body }, token);
        setSuccess("Post created successfully.");
      }

      setTitle("");
      setBody("");
      setEditingPost(null);

      await fetchPosts();
    } catch (error) {
      console.error(error);
      setError(error.message || "Failed to save post.");
    } finally {
      setSaving(false);
    }
  }

  function handleEdit(post) {
    if (!isAuthenticated) {
      setError("Please login first before editing posts.");
      return;
    }

    setEditingPost(post);
    setTitle(post.title);
    setBody(post.body);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function handleCancelEdit() {
    setEditingPost(null);
    setTitle("");
    setBody("");
    setError("");
    setSuccess("");
  }

  async function handleDelete(id) {
    if (!isAuthenticated) {
      setError("Please login first before deleting posts.");
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (!confirmed) return;

    try {
      setSaving(true);
      setSuccess("");
      setError("");

      await deletePost(id, token);

      setSuccess("Post deleted successfully.");
      await fetchPosts();
    } catch (error) {
      console.error(error);
      setError(error.message || "Failed to delete post.");
    } finally {
      setSaving(false);
    }
  }

  function goToPreviousPage() {
    setPage((currentPage) => Math.max(currentPage - 1, 1));
  }

  function goToNextPage() {
    setPage((currentPage) =>
      Math.min(currentPage + 1, pagination?.totalPages || 1)
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <p className="text-sm font-medium text-blue-400">
            ReactLab Full-Stack
          </p>

          <h1 className="mt-2 text-3xl font-bold">
            API Lab with PostgreSQL
          </h1>

          <p className="mt-3 max-w-2xl text-slate-300">
            This page connects your React frontend to an Express API and stores
            data in your PostgreSQL database.
          </p>

          <div className="mt-4 flex flex-wrap gap-3">
            {isAuthenticated ? (
              <div className="inline-flex rounded-full bg-green-500/10 px-4 py-2 text-sm text-green-300">
                Authenticated
              </div>
            ) : (
              <div className="inline-flex rounded-full bg-red-500/10 px-4 py-2 text-sm text-red-300">
                Not Logged In
              </div>
            )}

            {isAdmin && (
              <div className="inline-flex rounded-full bg-purple-500/10 px-4 py-2 text-sm text-purple-300">
                Admin
              </div>
            )}
          </div>

          {isAuthenticated && (
            <div className="mt-5 rounded-xl border border-slate-800 bg-slate-900 p-4 text-sm text-slate-300">
              <p>Logged in as: {user?.name}</p>
              <p>Role: {user?.role}</p>
            </div>
          )}
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl"
        >
          <h2 className="mb-5 text-xl font-semibold">
            {editingPost ? "Edit Post" : "Create New Post"}
          </h2>

          {success && (
            <div className="mb-4 rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-300">
              {success}
            </div>
          )}

          {error && (
            <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {error}
            </div>
          )}

          <div className="grid gap-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Title
              </label>

              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-blue-500"
                placeholder="Enter post title"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Body
              </label>

              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows="4"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-blue-500"
                placeholder="Enter post body"
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                disabled={saving}
                className="rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving
                  ? "Saving..."
                  : editingPost
                  ? "Update Post"
                  : "Create Post"}
              </button>

              {editingPost && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="rounded-xl border border-slate-700 px-5 py-3 font-medium text-slate-300 transition hover:bg-slate-800"
                >
                  Cancel Edit
                </button>
              )}

              <button
                type="button"
                onClick={() => fetchPosts()}
                disabled={loading}
                className="rounded-xl border border-slate-700 px-5 py-3 font-medium text-slate-300 transition hover:bg-slate-800 disabled:opacity-60"
              >
                {loading ? "Refreshing..." : "Refresh"}
              </button>
            </div>
          </div>
        </motion.form>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl"
        >
          <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <h2 className="text-xl font-semibold">Posts Table</h2>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search posts..."
                className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-2 text-sm text-white outline-none transition focus:border-blue-500"
              />

              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-2 text-sm text-white outline-none transition focus:border-blue-500"
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="title_az">Title A-Z</option>
                <option value="title_za">Title Z-A</option>
              </select>

              <span className="rounded-full bg-slate-800 px-3 py-1 text-sm text-slate-300">
                {pagination?.total || 0} records
              </span>
            </div>
          </div>

          {loading ? (
            <p className="text-slate-400">Loading posts...</p>
          ) : posts.length === 0 ? (
            <p className="text-slate-400">No posts found.</p>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr className="border-b border-slate-800 text-sm text-slate-400">
                      <th className="px-4 py-3">ID</th>
                      <th className="px-4 py-3">Title</th>
                      <th className="px-4 py-3">Body</th>
                      <th className="px-4 py-3">Owner</th>
                      <th className="px-4 py-3 text-right">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {posts.map((post) => {
                      const isOwner = user && post.user_id === user.id;
                      const canManagePost = isOwner || isAdmin;

                      return (
                        <tr
                          key={post.id}
                          className="border-b border-slate-800 text-sm transition hover:bg-slate-800/50"
                        >
                          <td className="px-4 py-4 text-slate-400">
                            {post.id}
                          </td>

                          <td className="px-4 py-4 font-medium text-white">
                            {post.title}
                          </td>

                          <td className="max-w-md px-4 py-4 text-slate-300">
                            {post.body}
                          </td>

                          <td className="px-4 py-4 text-slate-400">
                            {isOwner ? "You" : `User ${post.user_id}`}
                          </td>

                          <td className="px-4 py-4">
                            <div className="flex justify-end gap-2">
                              {canManagePost ? (
                                <>
                                  <button
                                    onClick={() => handleEdit(post)}
                                    className="rounded-lg border border-blue-500/40 px-3 py-2 text-sm text-blue-300 transition hover:bg-blue-500/10"
                                  >
                                    Edit
                                  </button>

                                  <button
                                    onClick={() => handleDelete(post.id)}
                                    className="rounded-lg border border-red-500/40 px-3 py-2 text-sm text-red-300 transition hover:bg-red-500/10"
                                  >
                                    Delete
                                  </button>
                                </>
                              ) : (
                                <span className="text-xs text-slate-500">
                                  Not owner
                                </span>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 flex flex-col gap-3 border-t border-slate-800 pt-5 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-slate-400">
                  Page {pagination?.page || 1} of{" "}
                  {pagination?.totalPages || 1}
                </p>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={goToPreviousPage}
                    disabled={(pagination?.page || 1) <= 1}
                    className="rounded-xl border border-slate-700 px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Previous
                  </button>

                  <button
                    type="button"
                    onClick={goToNextPage}
                    disabled={
                      (pagination?.page || 1) >=
                      (pagination?.totalPages || 1)
                    }
                    className="rounded-xl border border-slate-700 px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}