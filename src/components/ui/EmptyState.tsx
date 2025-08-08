import { Calendar } from "lucide-react";

interface EmptyStatePropsType {
  title: string;
  description: string;
  action?: React.ReactNode;
}

export default function EmptyState({
  title,
  description,
  action,
}: EmptyStatePropsType) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12 px-6">
      <div className="w-24 h-24 mx-auto mb-4 bg-gray-800 rounded-full flex items-center justify-center">
        <Calendar className="w-12 h-12 text-gray-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-400 mb-2">{title}</h3>
      <p className="text-gray-500 mb-6">{description}</p>
      {action && action}
    </div>
  );
}
