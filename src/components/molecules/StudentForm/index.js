import Button from "@/components/atoms/Button";
import InputField from "@/components/atoms/InputField";

const StudentForm = ({
  isModalOpen,
  formData,
  handleInputChange,
  handleSubmit,
  error,
  toggleModal,
  loadingSubmit,
  classes,
  isEditing, // NEW: Determines if we're adding or updating
}) => (
  <>
    {isModalOpen && (
      <div className="fixed inset-0 text-white flex justify-center items-center z-50">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full border-2 border-gray-500">
          <h2 className="text-xl font-bold mb-4 text-gray-700 dark:text-gray-300">
            {isEditing ? "Update Student" : "Add New Student"}{" "}
          </h2>

          {error && <p className="text-red-500 mb-2">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-3">
            <InputField
              type="text"
              name="nis"
              placeholder="NIS"
              value={formData.nis}
              onChange={handleInputChange}
              required
            />
            <InputField
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />

            <select
              name="classId"
              value={formData.classId}
              onChange={handleInputChange}
              className="w-full p-2 border rounded bg-gray-700"
              required
            >
              <option value="">Select Class</option>
              {classes?.data.map((classItem) => (
                <option key={classItem.classesId} value={classItem.classesId}>
                  {classItem.classesName}
                </option>
              ))}
            </select>

            <InputField
              type="date"
              name="birthdate"
              value={formData.birthdate}
              onChange={handleInputChange}
              required
            />
            <InputField
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleInputChange}
              required
            />
            <InputField
              type="tel"
              name="phoneNumber"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              required
            />

            <div className="flex justify-end space-x-2">
              <button
                type="button"
                className="px-4 py-2 bg-gray-400 text-white rounded"
                onClick={toggleModal}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                {loadingSubmit ? "Adding..." : "Add"}
              </button>
            </div>
          </form>
        </div>
      </div>
    )}
  </>
);

export default StudentForm;
