import React, { useState } from "react";

interface Props {
  type: string;
  acceptFunction: (input: string | null) => void;
  rejectFunction: () => void;
  message?: string;
}

export default function Modal({
  type,
  acceptFunction,
  rejectFunction,
  message,
}: Props) {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="p-6 rounded-lg shadow-lg w-96 bg-gray-800 text-white">
        <h2 className="text-lg font-semibold mb-4">
          {(type === "input" && message) ||
            (type === "input" && "Enter a value")}
          {(type === "confirmation" && message) ||
            (type === "confirmation" && "Are you sure?")}
        </h2>
        {type === "input" && (
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full p-2 border rounded mb-4"
            placeholder="Type here..."
          />
        )}
        <div className="flex justify-end space-x-2">
          <button
            className="px-4 py-2 bg-gray-400 rounded hover:bg-gray-400"
            onClick={rejectFunction}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => acceptFunction(type === "input" ? inputValue : null)}
          >
            {type === "confirmation" ? "Yes" : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
}
