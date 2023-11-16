import React from "react";

export default function ComplaintList({ complaints }) {
  return (
    <ul>
      {complaints.map((complaint) => (
        <li key={complaint.id}>
          <h2>{complaint.title}</h2>
          <p>{complaint.description}</p>
          <p>Created at: {complaint.createdAt}</p>
          <p>Status: {complaint.status}</p>
        </li>
      ))}
    </ul>
  );
}
