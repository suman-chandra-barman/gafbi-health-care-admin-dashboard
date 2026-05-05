/** @format */
"use client";

import React from "react";
import UsersTable from "@/components/AdminComponents/UsersComponents/UsersTable";

const mockUsers = [
  {
    userId: "@edickson1",
    name: "Apr\u00f3d Endre",
    email: "willie.jennings@example.com",
    joined: "May 9, 2014",
    careLevel: "B2",
  },
  {
    userId: "@abradley3",
    name: "Csat\u00e1r G\u00e9za",
    email: "georgia.young@example.com",
    joined: "October 31, 2017",
    careLevel: "B1",
  },
  {
    userId: "@jferguson1",
    name: "Antal Andr\u00e1s",
    email: "michelle.rivera@example.com",
    joined: "August 2, 2013",
    careLevel: "B1",
  },
  {
    userId: "@abutler3",
    name: "Szigmund K\u00e1lm\u00e1n",
    email: "dolores.chambers@example.com",
    joined: "February 9, 2015",
    careLevel: "B1",
  },
  {
    userId: "@tslover2",
    name: "Bogd\u00e1n Norbert",
    email: "michael.mitc@example.com",
    joined: "October 30, 2017",
    careLevel: "C2",
  },
  {
    userId: "@tbrady123",
    name: "Tak\u00e1cs B\u00e9la",
    email: "deanna.curtis@example.com",
    joined: "August 7, 2017",
    careLevel: "A2",
  },
  {
    userId: "@ttomlinson",
    name: "Hajd\u00fa Szilveszter",
    email: "bill.sanders@example.com",
    joined: "November 28, 2015",
    careLevel: "B1",
  },
  {
    userId: "@tcurren34",
    name: "Kov\u00e1cs Lajos",
    email: "alma.lawson@example.com",
    joined: "May 20, 2015",
    careLevel: "B1",
  },
  {
    userId: "@abutler3",
    name: "Fekete Csan\u00e1d",
    email: "debra.holt@example.com",
    joined: "May 12, 2019",
    careLevel: "A2",
  },
  {
    userId: "@tbrady123",
    name: "Simon \u00c1rp\u00e1d",
    email: "nevaeh.simmons@example.com",
    joined: "December 19, 2013",
    careLevel: "A1",
  },
  {
    userId: "@edickson1",
    name: "Balogh Imre",
    email: "kenzi.lawson@example.com",
    joined: "May 29, 2017",
    careLevel: "C1",
  },
  {
    userId: "@abradley3",
    name: "Somogyi Adri\u00e1n",
    email: "nathan.roberts@example.com",
    joined: "November 16, 2014",
    careLevel: "A2",
  },
  {
    userId: "@jferguson1",
    name: "Szab\u00f3 Jakab",
    email: "tim.jennings@example.com",
    joined: "March 23, 2013",
    careLevel: "C1",
  },
];

const UsersPage = () => {
  return (
    <div className="">
      <UsersTable users={mockUsers} />
    </div>
  );
};

export default UsersPage;
