import StudentTableRow from "@/components/molecules/StudentTableRow";

const StudentTable = ({ students, onUpdate, onSoftDelete, onDelete }) => (
  <div className="overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200 ">
      <thead className="bg-gray-100 ">
        <tr>
          <th className="px-6 py-1 text-left text-xs font-medium text-gray-500  uppercase">
            Name
          </th>
          <th className="px-6 py-1 text-left text-xs font-medium text-gray-500  uppercase">
            Class
          </th>
          <th className="px-6 py-1 text-left text-xs font-medium text-gray-500  uppercase">
            Phone
          </th>
          <th className="px-6 py-1 text-left text-xs font-medium text-gray-500  uppercase">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        {students?.length > 0 ? (
          students?.map((student) => (
            <StudentTableRow
              key={student.id}
              student={student}
              onUpdate={onUpdate}
              onSoftDelete={onSoftDelete}
              onDelete={onDelete}
            />
          ))
        ) : (
          <tr>
            <td colSpan="4" className="text-center py-4 text-gray-500 ">
              No students found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);

export default StudentTable;
