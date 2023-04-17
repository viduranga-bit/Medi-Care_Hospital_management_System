export const RoleManager = {
  ADMIN: [
    "dashboard",
    "doctor",
    "department",
    "calander",
    "pharmacist",
    "laboratorist",
    "recieptionist",
    "medicine",
  ],
  DOCTOR: ["dashboard", "appointments", "treatPatient"],
  NURSE: ["dashboard", "patient", "nurse", "department"],
  LABORARIST: ["dashboard", "submitReport","issuedReports"],
  PHARMACIST: ["dashboard", "issuedMedicine", "issueMedicine"],
  ACCOUNTANT: ["dashboard", "patient", "nurse", "department"],
  RECIEPTIONIST: ["dashboard", "registerPatient", "printPatientDetails"],
};