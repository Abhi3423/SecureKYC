import React from "react";

const LanguageSelection = () => {
  return (
    <article className="rounded-xl border border-blue-700 bg-gray-100 p-4 m-4 mt-11">
      <ul className="mt-4 space-y-5">
        <li>
          <a
            href="#"
            className="block h-full rounded-lg border border-blue-700 p-4 hover:border-gray-600 hover:bg-gray-200"
          >
            <strong className="font-medium text-black">English</strong>
          </a>
        </li>
        <li>
          <a
            href="#"
            className="block h-full rounded-lg border border-blue-700 p-4 hover:border-gray-600 hover:bg-gray-200"
          >
            <strong className="font-medium text-black">हिन्दी</strong>
          </a>
        </li>
        <li>
          <a
            href="#"
            className="block h-full rounded-lg border border-blue-700 p-4 hover:border-gray-600 hover:bg-gray-200"
          >
            <strong className="font-medium text-black">தமிழ்</strong>
          </a>
        </li>
        <li>
          <a
            href="#"
            className="block h-full rounded-lg border border-blue-700 p-4 hover:border-gray-600 hover:bg-gray-200"
          >
            <strong className="font-medium text-black">తెలుగు</strong>
          </a>
        </li>
        <li>
          <a
            href="#"
            className="block h-full rounded-lg border border-blue-700 p-4 hover:border-gray-600 hover:bg-gray-200"
          >
            <strong className="font-medium text-black">বাংলা</strong>
          </a>
        </li>
      </ul>
    </article>
  );
};

export default LanguageSelection;
