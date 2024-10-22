// Lembrar de tipar user [linha 24]

import React from "react";
import { object } from "zod";

export default function UsersList(props: { caption: string; users: any }) {
  const caption = props.caption;
  const users = props.users;


  return (
    <table className="border-collapse border border-slate-500 user-table w-full my-8">
      <caption className="caption-top my-2">{caption}:</caption>
      <thead>
        <tr>
          <th className="border border-slate-600">ID</th>
          <th className="border border-slate-600">Nome completo</th>
          <th className="border border-slate-600">Email</th>
          <th className="border border-slate-600">Celular</th>
          <th className="border border-slate-600">RA</th>
        </tr>
      </thead>
      <tbody className="user-body">
        {users.map((user) => {
          if (user.accessLevel === "member") {
            return (
              <tr className="user-info">
                <td className="user-id border border-slate-600 px-1">{user.id}</td>
                <td className="user-full_name border border-slate-600 px-1">{user.name}</td>
                <td className="user-id border border-slate-600 px-1">{user.email}</td>
                <td className="user-id border border-slate-600 px-1">{user.cellphoneNumber}</td>
                <td className="user-ra border border-slate-600 px-1">{user.ra}</td>
              </tr>
            );
          }
          else if (user.accessLevel === "admin") {
            return (
              <tr className="user-info">
                <td className="user-id border border-slate-600 px-1">{user.id}</td>
                <td className="user-full_name border border-slate-600 px-1">{user.name}</td>
                <td className="user-id border border-slate-600 px-1">{user.email}</td>
                <td className="user-id border border-slate-600 px-1">{user.cellphoneNumber}</td>
                <td className="user-ra border border-slate-600 px-1">{user.ra}</td>
              </tr>
            );
          }
        })}
      </tbody>
    </table>
  );
}
