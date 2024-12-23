"use client";

import React, { useEffect, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { getLeadByID, updateLead, deleteLead } from "@/restAPIs/leads";

interface Lead {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  country_code: string;
  phone: string;
  instagram_user_name: string;
  location: string;
  package_id: number;
  package_name: string;
  no_of_days: number;
  pax: number;
  createdAt: string; // Ensure createdAt, updatedAt, and __v are included
  updatedAt: string;
  __v: number;
}

function LeadDetail() {
  const router = useRouter();
  const [lead, setLead] = useState<Lead | null>(null);
  const [formData, setFormData] = useState<FormLead | null>(null);
  const pathname = usePathname();
  const id = pathname.replace("/leads/", "");
  useEffect(() => {
    if (id) {
      getLeadByID(id as string).then((response) => {
        console.log(response);
        setLead(response.data);
        setFormData(response.data);
      });
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => {
      if (prevState) {
        return {
          ...prevState,
          [name]: value,
        };
      }
      return prevState; // If prevState is null, return null
    });
  };

  const handleUpdate = () => {
    if (formData) {
      updateLead(formData, id)
        .then(() => {
          alert("Lead updated successfully");
        })
        .catch((err) => {
          console.log(err);
          alert("Failed to update lead");
        });
    }
  };

  const handleDelete = () => {
    if (lead?._id) {
      deleteLead(lead._id)
        .then(() => {
          alert("Lead deleted successfully");
          router.push("/leads");
        })
        .catch((err) => {
          console.log(err);
          alert("Failed to delete lead");
        });
    }
  };

  return (
    <Box
      component="form"
      sx={{
        maxWidth: 600,
        margin: "auto",
        padding: 4,
        borderRadius: 2,
        boxShadow: 3,
        backgroundColor: "#f9f9f9",
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography variant="h5" sx={{ marginBottom: 2, textAlign: "center" }}>
        Edit Lead
      </Typography>

      {formData && (
        <>
          <TextField
            fullWidth
            label="First Name"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Last Name"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Instagram Username"
            name="instagram_user_name"
            value={formData.instagram_user_name}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Package Name"
            name="package_name"
            value={formData.package_name}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Number of Days"
            name="no_of_days"
            value={formData.no_of_days}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Pax"
            name="pax"
            value={formData.pax}
            onChange={handleChange}
          />

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 2,
            }}
          >
            <Button variant="contained" color="primary" onClick={handleUpdate}>
              Update
            </Button>
            <Button variant="contained" color="error" onClick={handleDelete}>
              Delete
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
}

export default LeadDetail;
