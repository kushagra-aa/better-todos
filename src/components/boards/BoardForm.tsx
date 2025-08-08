import { useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Loader from "@/components/ui/Loader";

type BoardFormPropsType = {
  onSubmit: (data: {
    name: string;
    description: string;
  }) => Promise<void> | void;
  loading?: boolean;
  initialData?: { name: string; description: string };
  handleCancel?: () => void;
};

export default function BoardForm({
  onSubmit,
  loading = false,
  initialData,
  handleCancel,
}: BoardFormPropsType) {
  const [name, setName] = useState(initialData?.name || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [errors, setErrors] = useState<{ name?: string; description?: string }>(
    {}
  );

  const handleSubmit = () => {
    // Simple validation
    const newErrors: { name?: string; description?: string } = {};
    if (!name.trim()) newErrors.name = "Board name is required";
    if (!description.trim()) newErrors.description = "Description is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    onSubmit({ name: name.trim(), description: description.trim() });
  };

  return (
    <div className="w-full px-6 flex flex-col gap-6 items-center">
      <Input
        label="Board Name"
        value={name}
        onChange={setName}
        placeholder="Enter board name"
        required
        error={errors.name}
      />

      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-200">
          Description <span className="text-red-500">*</span>
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter board description"
          required
          rows={4}
          className={`w-full min-w-2xs sm:min-w-sm px-3 py-2 border rounded-lg shadow-sm focus:outline-none  focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            errors.description ? "border-red-300" : "border-gray-300"
          }`}
        />
        {errors.description && (
          <p className="text-sm text-red-600">{errors.description}</p>
        )}
      </div>

      <div className="flex space-x-3 min-w-2xs sm:min-w-sm">
        <Button onClick={handleSubmit} disabled={loading} className="flex-1">
          {loading ? <Loader size="xs" /> : "Create Board"}
        </Button>
        <Button variant="secondary" onClick={handleCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
}
