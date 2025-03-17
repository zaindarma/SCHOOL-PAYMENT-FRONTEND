import React from "react";
import { useStudents } from "@/hooks/useStudents";
import { getToken } from "@/services/auth";

const StudentList = () => {
  const token = getToken();
  const { data, loading, error } = useStudents(0, 10, token); // Default: Page 0, 10 students per page
  console.log(data);

  if (loading) return <p>Loading students...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Student List</h2>
      <ul>
        {data?.data.map((student) => (
          <li key={student.id}>
            {student.name} - {student.classData.className}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentList;
