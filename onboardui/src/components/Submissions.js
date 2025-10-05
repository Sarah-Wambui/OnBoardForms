import React, { useEffect, useState } from "react";

export default function Submissions() {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/submissions/")
      .then((res) => res.json())
      .then((data) => setSubmissions(data))
      .catch((err) => console.error("Error fetching submissions:", err));
  }, []);

  return (
    <div className="submissions">
      <h2 className="text-xl font-bold mb-4 text-center">Form Submissions</h2>
      <table className="table-auto w-full border border-gray-300 shadow-md submission-table">
        <thead>
          <tr className="bg-light-100">
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Form ID</th>
            <th className="border px-4 py-2">Data</th>
            <th className="border px-4 py-2">Submitted At</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((sub) => (
            <tr key={sub.id}>
              <td className="border px-4 py-2">{sub.id}</td>
              <td className="border px-4 py-2">{sub.form}</td>
              <td className="border px-4 py-2">
                {Object.entries(sub.data).map(([key, value]) => (
                  <div key={key}>
                    <strong>{key}:</strong> {value.toString()}
                  </div>
                ))}
              </td>
              <td className="border px-4 py-2">
                {new Date(sub.submitted_at).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
