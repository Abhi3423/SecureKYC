import React, { useState } from "react";
import { GiFarmer, GiTeacher } from "react-icons/gi";
import { MdEngineering } from "react-icons/md";
import { FaUserDoctor } from "react-icons/fa6";
import { MdScience } from "react-icons/md";
import { FaChalkboardTeacher } from "react-icons/fa";
import { FaUserTie } from "react-icons/fa6";
import { FaUserInjured } from "react-icons/fa";
import { PiStudent } from "react-icons/pi";
const EmployabilityStatus = [
  {
    id: 1,
    title: "Farmer",
    icon: <GiFarmer className="text-blue-500 w-6 h-6" />,
  },
  {
    id: 2,
    title: "Engineer",
    icon: <MdEngineering className="text-blue-500 w-6 h-6" />,
  },
  {
    id: 3,
    title: "Doctor",
    icon: <FaUserDoctor className="text-blue-500 w-6 h-6" />,
  },
  {
    id: 4,
    title: "Scientist",
    icon: <MdScience className="text-blue-500 w-6 h-6" />,
  },
  {
    id: 5,
    title: "Teacher",
    icon: <FaChalkboardTeacher className="text-blue-500 w-6 h-6" />,
  },
  {
    id: 6,
    title: "CEO",
    icon: <FaUserTie className="text-blue-500 w-6 h-6" />,
  },
  {
    id: 7,
    title: "Unemployed",
    icon: <FaUserInjured className="text-blue-500 w-6 h-6" />,
  },
  {
    id: 8,
    title: "Student",
    icon: <PiStudent className="text-blue-500 w-6 h-6" />,
  },
];

const SalaryRange = [
  {
    id: 1,
    title: "0 - 1 Lac",
  },
  {
    id: 2,
    title: "1 - 3 Lac",
  },
  {
    id: 3,
    title: "3 - 5 Lac",
  },
  {
    id: 4,
    title: "5 - 10 Lac",
  },
  {
    id: 5,
    title: "10 - 20 Lac",
  },
  {
    id: 6,
    title: "20 - 50 + Lac",
  },
];

const Step1 = () => {
  const [selectedEmployability, setSelectedEmployability] = useState("");

  const handleEmployabilityChange = (event) => {
    setSelectedEmployability(event.target.value);
  };

  return (
    <div>
      <h1 className="text-blue-500 text-3xl font-bold ">
        Employability Status
      </h1>
      <p className="text-blue-500 font-bold text-xl">(In Selected Language)</p>
      <div className="flex flex-wrap rounded-xl  max-w-sm mx-auto mt-8 p-2">
        <fieldset className="space-y-4 mx-auto">
          <legend className="sr-only">Employability</legend>
          {EmployabilityStatus.map((status) => (
            <div key={status.id}>
              <label
                htmlFor={status.title}
                className="flex cursor-pointer items-center justify-between gap-4 rounded-lg border border-gray-100 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200 has-[:checked]:border-blue-500 has-[:checked]:ring-1 has-[:checked]:ring-blue-500"
              >
                <p className="text-gray-700">{status.title}</p>
                <p className="text-gray-900">{status.icon}</p>
                <input
                  type="radio"
                  name="employability"
                  value={status.title}
                  id={status.title}
                  className="sr-only"
                  checked={selectedEmployability === status.title}
                  onChange={handleEmployabilityChange}
                />
              </label>
            </div>
          ))}
        </fieldset>
      </div>
    </div>
  );
};

const Step2 = () => {
  const [selectedSalary, setSelectedSalary] = useState("");

  const handleSalaryChange = (event) => {
    setSelectedSalary(event.target.value);
  };
  return (
    <div>
      <h1 className="text-blue-500 text-3xl font-bold ">Salary Range</h1>
      <p className="text-blue-500 font-bold text-xl">(In Selected Language)</p>
      <div className="flex flex-wrap rounded-xl  max-w-sm mx-auto mt-8 p-2">
        <fieldset className="space-y-4 mx-auto">
          <legend className="sr-only">Employability</legend>
          {SalaryRange.map((range) => (
            <div key={range.id}>
              <label
                htmlFor={range.title}
                className="flex cursor-pointer items-center justify-between gap-4 rounded-lg border border-gray-100 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200 has-[:checked]:border-blue-500 has-[:checked]:ring-1 has-[:checked]:ring-blue-500"
              >
                <p className="text-gray-700">{range.title}</p>
                {/* <p className="text-gray-900">{status.icon}</p> */}
                <input
                  type="radio"
                  name="employability"
                  value={range.title}
                  id={range.title}
                  className="sr-only"
                  checked={selectedSalary === range.title}
                  onChange={handleSalaryChange}
                />
              </label>
            </div>
          ))}
        </fieldset>
      </div>
    </div>
  );
};

const PersonalDetails = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => {
    setCurrentStep((prevStep) => (prevStep < 2 ? prevStep + 1 : 1));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1 />;
      case 2:
        return <Step2 />;

      default:
        return null;
    }
  };

  return (
    <article className="rounded-xl border border-blue-700 bg-gray-100 p-4 m-4 mt-11">
      {renderStep()}
      <button
        className="mt-3 inline-flex items-center gap-2 rounded border border-blue-500 bg-blue-500 px-8 py-3 text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
        onClick={nextStep}
      >
        <span className="text-sm font-medium"> Next </span>

        <svg
          className="size-5 rtl:rotate-180"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      </button>
    </article>
  );
};

export default PersonalDetails;
