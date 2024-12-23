"use client";
import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { createLeads } from "@/restAPIs/leads";
import SnackbarAlert from "../common/SnackbarAlert";
import { useRouter } from "next/navigation";



const LeadForm: React.FC = () => {
  const router  = useRouter()
  const [openSucess, setOpenSucess] = useState<boolean>(false)
  const [openError, setOpenError] = useState<boolean>(false)
  const [leadData, setLeadData] = useState<FormLead>({
    first_name: "",
    last_name: "",
    email: "",
    country_code: 91,
    phone: 0,
    instagram_user_name: "",
    location: "",
    package_id: 0,
    package_name: "",
    no_of_days: 0,
    pax: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLeadData((prevState) => ({
      ...prevState,
      [name]: name === "phone" || name === "package_id" || name === "no_of_days" || name === "pax"
        ? parseInt(value) 
        : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
   try {
    const res = await createLeads(leadData)
    if(res.data){
      setOpenSucess(true)
      router.push(`/leads`)
    }
   } catch (error) {
    console.log(error)
    setOpenError(true)
   }
  };

  return (
    <>
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 480, // Reduce width
        margin: "auto",
        padding: 3,
        borderRadius: 2,
        boxShadow: 3,
        backgroundColor: "#ffffff",
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography variant="h6" sx={{ marginBottom: 2, textAlign: "center", fontWeight: "bold" }}>
        Create a New Lead
      </Typography>

      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
        <TextField
          fullWidth
          label="First Name"
          name="first_name"
          value={leadData.first_name}
          onChange={handleChange}
          required
          size="small" // Smaller size for text fields
        />
        <TextField
          fullWidth
          label="Last Name"
          name="last_name"
          value={leadData.last_name}
          onChange={handleChange}
          required
          size="small"
        />
      </Box>

      <TextField
        fullWidth
        label="Email"
        name="email"
        value={leadData.email}
        onChange={handleChange}
        type="email"
        required
        size="small"
      />

      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
        <TextField
          fullWidth
          label="Country Code"
          name="country_code"
          value={leadData.country_code}
          onChange={handleChange}
          type="number"
          required
          size="small"
        />
        <TextField
          fullWidth
          label="Phone"
          name="phone"
          value={leadData.phone}
          onChange={handleChange}
          type="number"
          required
          size="small"
        />
      </Box>

      <TextField
        fullWidth
        label="Instagram Username"
        name="instagram_user_name"
        value={leadData.instagram_user_name}
        onChange={handleChange}
        size="small"
      />

      <TextField
        fullWidth
        label="Location"
        name="location"
        value={leadData.location}
        onChange={handleChange}
        required
        size="small"
      />

      <TextField
        fullWidth
        label="Package Name"
        name="package_name"
        value={leadData.package_name}
        onChange={handleChange}
        required
        size="small"
      />

      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
        <TextField
          fullWidth
          label="Package ID"
          name="package_id"
          value={leadData.package_id}
          onChange={handleChange}
          type="number"
          required
          size="small"
        />
        <TextField
          fullWidth
          label="Number of Days"
          name="no_of_days"
          value={leadData.no_of_days}
          onChange={handleChange}
          type="number"
          required
          size="small"
        />
      </Box>

      <TextField
        fullWidth
        label="Pax"
        name="pax"
        value={leadData.pax}
        onChange={handleChange}
        type="number"
        required
        size="small"
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ marginTop: 2, padding: "8px 16px" }} // Adjust button padding for smaller size
      >
        Submit
      </Button>
    </Box>
    <SnackbarAlert
        message="Created Lead Successfully"
        autoHideDuration={5000}
        open={openSucess}
        setOpen={setOpenSucess}
        type="success"
      />
      <SnackbarAlert
        message="Error in lead Creation"
        autoHideDuration={5000}
        open={openError}
        setOpen={setOpenError}
        type="error"
      />
    </>
  );
};

export default LeadForm;
