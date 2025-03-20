import Button from "@/components/atoms/Button";
import InputField from "@/components/atoms/InputField";

const ClassesForm = ({
  isModalOpen,
  formData,
  handleInputChange,
  handleSubmit,
  error,
  toggleModal,
  loadingSubmit,
  schoolYears, // Array of school years for selection
  isEditing,
}) => (
  <>
    {isModalOpen && (
      <div className="fixed inset-0 text-white flex justify-center items-center z-50">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full border-2 border-gray-500">
          <h2 className="text-xl font-bold mb-4 text-gray-700 dark:text-gray-300">
            {isEditing ? "Update Class" : "Add New Class"}
          </h2>

          {error && <p className="text-red-500 mb-2">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Hidden ID Field for Editing */}
            <input name="classesId" type="number" value={formData.classesId} hidden readOnly />

            {/* Class Name */}
            <InputField
              type="text"
              name="classesName"
              placeholder="Class Name"
              value={formData.classesName}
              onChange={handleInputChange}
              required
            />

            {/* School Year Dropdown */}
            <select
              name="schoolYearId"
              value={formData.schoolYearId}
              onChange={handleInputChange}
              className="w-full p-2 border rounded text-white bg-gray-700"
              required
            >
              <option value="">Select School Year</option>
              {schoolYears?.map((year) => (
                <option key={year.schoolYearId} value={year.schoolYearId}>
                  {year.schoolYear}
                </option>
              ))}
            </select>

            {/* Buttons */}
            <div className="flex justify-end space-x-2">
              <button type="button" className="px-4 py-2 bg-gray-400 text-white rounded" onClick={toggleModal}>
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
                {loadingSubmit ? (isEditing ? "Updating..." : "Adding...") : isEditing ? "Update" : "Add"}
              </button>
            </div>
          </form>
        </div>
      </div>
    )}
  </>
);

export default ClassesForm;
