import React from "react";
import {
  AiFillBank,
  AiFillDashboard,
  AiOutlineAreaChart,
  AiOutlineBarChart,
  AiOutlineStock,
  AiFillSave
} from "react-icons/ai";
import {
  FiShoppingBag,
  FiBarChart,
  FiCreditCard,
  FiStar,
  FiShoppingCart,
 
} from "react-icons/fi";

import {
  BsKanban,
  BsBarChart,
  BsBoxSeam,
  BsCurrencyDollar,
  BsShield,
  BsChatLeft,
} from "react-icons/bs";
import { ImLab } from "react-icons/im";
import { IoMdContacts } from "react-icons/io";
import { FaHospitalUser, FaUserNurse } from "react-icons/fa";
import {
  MdOutlineSupervisorAccount,
  MdLocalPharmacy,
  MdManageAccounts,
} from "react-icons/md";
import { HiOutlineRefresh } from "react-icons/hi";
import { TiTick } from "react-icons/ti";
import { GiDoctorFace } from "react-icons/gi";
import { GrLocation } from "react-icons/gr";


export const links = [
  {
    title: "Admin Dashboard",
    links: [
      {
        name: "login",
        path: "",
        icon: <AiFillDashboard />,
        accessLev: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      },
      {
        name: "dashboard",
        path: "",
        icon: <AiFillDashboard />,
        accessLev: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      },
      {
        path: "department",
        name: "department",
        icon: <AiFillSave />,
      },
      {
        path: "registerPatient",
        name: "registerPatient",
        icon: <AiFillSave />,
      },
      {
        path: "doctor",
        name: "doctor",
        icon: <GiDoctorFace />,
        accessLev: [0, 1, 2],
      },
      {
        path: "patient",
        name: "patient",
        icon: <FaHospitalUser />,
        accessLev: [0, 1, 2],
      },
      {
        path: "nurse",
        name: "nurse",
        icon: <FaUserNurse />,
        accessLev: [0, 1, 2],
      },
      {
        path: "pharmacist",
        name: "pharmacist",
        icon: <MdLocalPharmacy />,
        accessLev: [0, 1, 2],
      },

      {
        path: "laboratorist",
        name: "laboratorist",
        icon: <ImLab />,
        accessLev: [0, 1, 2],
      },
      {
        path: "accountant",
        name: "accountant",
        icon: <MdManageAccounts />,
        accessLev: [0, 1, 2],
      },
      {
        path: "recieptionist",
        name: "recieptionist",
        icon: <IoMdContacts />,
        accessLev: [0, 1, 2],
      },
      {
        path: "medicine",
        name: "medicine",
        icon: <IoMdContacts />,
        accessLev: [0, 1, 2],
      },
      {
        path: "issuedReports",
        name: "issuedReports",
        icon: <IoMdContacts />,
        accessLev: [0, 1, 2],
      },
      {
        path: "monitorHospital",
        name: "monitorHospital",
        icon: <IoMdContacts />,
        accessLev: [0, 1, 2],
      },
      {
        path: "issuedMedicine",
        name: "issuedMedicine",
        icon: <IoMdContacts />,
        accessLev: [0, 1, 2],
      },

      //doctor Routes
      {
        path: "appointments",
        name: "appointments",
        icon: <IoMdContacts />,
        accessLev: [0, 1, 2],
      },

      //pharmacist routes
    ],
  },
];


export const earningData = [
  {
    icon: <AiFillBank />,
    amount: "39,34",
    title: "Departments",
    iconColor: "#03C9D7",
    iconBg: "#E5FAFB",
    pcColor: "red-600",
  },

  {
    icon: <MdOutlineSupervisorAccount />,
    amount: "39,354",
    percentage: "-4%",
    title: "Doctors",
    iconColor: "#03C9D7",
    iconBg: "#E5FAFB",
    pcColor: "red-600",
  },

  {
    icon: <FiBarChart />,
    amount: "423,39",
    percentage: "+38%",
    title: "Patients",
    iconColor: "rgb(228, 106, 118)",
    iconBg: "rgb(255, 244, 229)",

    pcColor: "green-600",
  },
  {
    icon: <HiOutlineRefresh />,
    amount: "39,354",
    percentage: "-12%",
    title: "Nurse",
    iconColor: "rgb(0, 194, 146)",
    iconBg: "rgb(235, 250, 242)",
    pcColor: "red-600",
  },
  {
    icon: <HiOutlineRefresh />,
    amount: "39,354",
    percentage: "-12%",
    title: "Pharmacist",
    iconColor: "rgb(0, 194, 146)",
    iconBg: "rgb(235, 250, 242)",
    pcColor: "red-600",
  },
  {
    icon: <HiOutlineRefresh />,
    amount: "39,354",
    percentage: "-12%",
    title: "Laboratorist",
    iconColor: "rgb(0, 194, 146)",
    iconBg: "rgb(235, 250, 242)",
    pcColor: "red-600",
  } 
 
];


export const themeColors = [
  {
    name: "blue-theme",
    color: "#1A97F5",
  },
  {
    name: "green-theme",
    color: "#03C9D7",
  },
  {
    name: "purple-theme",
    color: "#7352FF",
  },
  {
    name: "red-theme",
    color: "#FF5C8E",
  },
  {
    name: "indigo-theme",
    color: "#1E4DB7",
  },
  {
    color: "#FB9678",
    name: "orange-theme",
  },
];

export const userProfileData = [
  {
    icon: <BsCurrencyDollar />,
    title: "My Profile",
    desc: "Account Settings",
    iconColor: "#03C9D7",
    iconBg: "#E5FAFB",
  },


];
