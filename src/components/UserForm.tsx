import { useEffect, useState } from "react";
import type { User } from "../types/userTypes";

interface Props {
  onSave: (user: Omit<User, "id">) => void;
  onUpdate: (user: User) => void;
  editingUser: User | null;
  cancelEdit: () => void;
}

export default function UserForm({
  onSave,
  onUpdate,
  editingUser,
  cancelEdit,
}: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (editingUser) {
      setName(editingUser.name);
      setEmail(editingUser.email);
    } else {
      setName("");
      setEmail("");
    }
    setErrors({});
  }, [editingUser]);

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email format";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (editingUser) {
      onUpdate({ ...editingUser, name, email });
      setMessage("User updated.");
    } else {
      onSave({ name, email });
      setMessage("User added.");
    }

    setTimeout(() => setMessage(""), 3000);
    setName("");
    setEmail("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 border p-4 rounded bg-white shadow">
      <h2 className="text-xl font-semibold mb-4">
        {editingUser ? "Edit User" : "Add User"}
      </h2>
      {message && <p className="text-green-600 mb-3">{message}</p>}

      <div className="mb-4">
        <label className="block font-medium mb-1">Name</label>
        <input
          type="text"
          placeholder="Enter your name"
          className="w-full border border-gray-300 rounded p-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">Email</label>
        <input
          placeholder="Enter your email"
          type="email"
          className="w-full border border-gray-300 rounded p-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          {editingUser ? "Update" : "Save"}
        </button>
        {editingUser && (
          <button
            type="button"
            onClick={cancelEdit}
            className="text-gray-600 hover:underline"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
