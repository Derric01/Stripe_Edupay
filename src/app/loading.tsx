import { Loader2Icon } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
      <div className="text-center">
        <div className="relative mb-8">
          <div className="w-20 h-20 border-4 border-indigo-200 rounded-full animate-spin border-t-indigo-600 mx-auto"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2Icon className="w-8 h-8 text-indigo-600 animate-spin" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Loading</h2>
        <p className="text-gray-600">Please wait while we prepare your content...</p>
      </div>
    </div>
  );
}
