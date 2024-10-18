// Lembrar de tipar user [linha 24]

import React from "react";

export default function UsersList(props: { caption: string; users: any }) {
  const caption = props.caption;
  const users = props.users;
  
  return (
    <table className="border-collapse border border-slate-500 user-table">
      <caption className="caption-top">{caption}</caption>
      <thead>
        <tr>
          <th className="border border-slate-600">ID</th>
          <th className="border border-slate-600">Nome completo</th>
          <th className="border border-slate-600">Email</th>
          <th className="border border-slate-600">Celular</th>
          <th className="border border-slate-600">RA</th>

          <th className="border border-slate-600">RA</th>
        </tr>
      </thead>
      <tbody className="user-body">
        {users.map((user) => {
          return (
            <tr className="user-info">
              <td className="user-id">{user.id}</td>
              <td className="user-full_name">{user.name}</td>
              <td className="user-id">{user.email}</td>
              <td className="user-id">{user.cellphoneNumber}</td>
              <td className="user-ra">{user.ra}</td>
            </tr>
          );
        })}
        <tr>
          <td>Dois</td>
        </tr>
      </tbody>
    </table>
  );
}
