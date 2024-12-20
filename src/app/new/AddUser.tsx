import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  name: Yup.string().min(3, 'Name must be at least 3 characters').required('Name is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  role: Yup.string().required('Role is required'),
  phone: Yup.string()
    .matches(/^\d{10}$/, 'Phone number must be 10 digits')
    .required('Phone number is required'),
  address: Yup.string().min(10, 'Address must be at least 10 characters').required('Address is required'),
});

const AddUser = () => {
  
  const initialValues = {
    name: '',
    email: '',
    role: '',
    phone: '',
    address: '',
  };

  const onSubmit = (values: typeof initialValues) => {
    console.log('Form Data:', values);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">Add User</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form>

            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <Field
                type="text"
                id="name"
                name="name"
                className="mt-1 block w-full px-3 py-2 border rounded-md text-gray-700 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
            </div>

         
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <Field
                type="email"
                id="email"
                name="email"
                className="mt-1 block w-full px-3 py-2 border rounded-md text-gray-700 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
            </div>

        
            <div className="mb-4">
              <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                Role
              </label>
              <Field
                as="select"
                id="role"
                name="role"
                className="mt-1 block w-full px-3 py-2 border rounded-md text-gray-700 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select a role</option>
                <option value="admin">Admin</option>
                <option value="viewer">Viewer</option>
              </Field>
              <ErrorMessage name="role" component="div" className="text-red-500 text-sm mt-1" />
            </div>

    
            <div className="mb-4">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <Field
                type="text"
                id="phone"
                name="phone"
                className="mt-1 block w-full px-3 py-2 border rounded-md text-gray-700 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <ErrorMessage name="phone" component="div" className="text-red-500 text-sm mt-1" />
            </div>

         
            <div className="mb-4">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <Field
                as="textarea"
                id="address"
                name="address"
                rows={3}
                className="mt-1 block w-full px-3 py-2 border rounded-md text-gray-700 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <ErrorMessage name="address" component="div" className="text-red-500 text-sm mt-1" />
            </div>


            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:ring-indigo-500"
              >
                {isSubmitting ? 'Submitting...' : 'Adding User'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddUser

