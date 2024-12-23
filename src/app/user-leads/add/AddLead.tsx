"use client";

import React from "react";
import { Formik, Form } from "formik";
import {
  TextField,
  Button,
  Box,
  Typography,
  Grid,
  FormControl,
  FormHelperText,
} from "@mui/material";
import * as Yup from "yup";
import { addLead } from "@/restAPIs/leads";

const AddLead: React.FC = () => {
  const validationSchema = Yup.object({
    packageId: Yup.string().required("Package ID is required"),
    leadOwner: Yup.string().required("Lead Owner is required"),
    createdDate: Yup.date().required("Created Date is required"),
    status: Yup.string().required("Status is required"),
  });

  const initialValues = {
    packageId: "",
    leadOwner: "",
    createdDate: "",
    status: "",
  };

  const handleSubmit = (values: typeof initialValues) => {
    const res = addLead(values);
    console.log(res);
    console.log("Form submitted with values:", values);
    alert("Lead added successfully!");
  };

  return (
    <Box sx={{ maxWidth: 600, margin: "0 auto", mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Add New Lead
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, handleChange, handleBlur }) => (
          <Form>
            <Grid container spacing={2}>
              {/* Package ID */}
              <Grid item xs={12}>
                <FormControl
                  fullWidth
                  error={Boolean(touched.packageId && errors.packageId)}
                >
                  <TextField
                    id="packageId"
                    name="packageId"
                    label="Package ID"
                    value={values.packageId}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <FormHelperText>
                    {touched.packageId && errors.packageId}
                  </FormHelperText>
                </FormControl>
              </Grid>

              {/* Lead Owner */}
              <Grid item xs={12}>
                <FormControl
                  fullWidth
                  error={Boolean(touched.leadOwner && errors.leadOwner)}
                >
                  <TextField
                    id="leadOwner"
                    name="leadOwner"
                    label="Lead Owner"
                    value={values.leadOwner}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <FormHelperText>
                    {touched.leadOwner && errors.leadOwner}
                  </FormHelperText>
                </FormControl>
              </Grid>

              {/* Created Date */}
              <Grid item xs={12}>
                <FormControl
                  fullWidth
                  error={Boolean(touched.createdDate && errors.createdDate)}
                >
                  <TextField
                    id="createdDate"
                    name="createdDate"
                    label="Created Date"
                    type="date"
                    value={values.createdDate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    InputLabelProps={{
                      shrink: true, // Keeps the label above the input for date fields
                    }}
                  />
                  <FormHelperText>
                    {touched.createdDate && errors.createdDate}
                  </FormHelperText>
                </FormControl>
              </Grid>

              {/* Status */}
              <Grid item xs={12}>
                <FormControl
                  fullWidth
                  error={Boolean(touched.status && errors.status)}
                >
                  <TextField
                    id="status"
                    name="status"
                    label="Status"
                    value={values.status}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <FormHelperText>
                    {touched.status && errors.status}
                  </FormHelperText>
                </FormControl>
              </Grid>

              {/* Submit Button */}
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Add Lead
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default AddLead;
