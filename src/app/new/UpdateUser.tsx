import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { updateUser } from "@/restAPIs/user";

const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  role: Yup.string().required("Role is required"),
  phone: Yup.string()
    .matches(/^\d{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
  address: Yup.string()
    .min(10, "Address must be at least 10 characters")
    .required("Address is required"),
});

interface FormValues {
  id: string;
  name: string;
  email: string;
  role: string;
  phone: string;
  address: string;
}

const UpdateUserComponent = () => {
  const handleSubmit = async (values: FormValues) => {
    try {
      const response = await updateUser(values);
      if (response.data.success) {
        console.log("User updated successfully.");
      } else {
        console.log(response.data.error || "Failed to update user.");
      }
    } catch (error) {
      throw new Error("An unexpected error occurred.");
    }
  };

  return (
    <div>
      <h2>Update User</h2>
      <Formik
        initialValues={{
          id: "",
          name: "",
          email: "",
          role: "",
          phone: "",
          address: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="id">User ID</label>
              <Field type="text" id="id" name="id" disabled />
              <ErrorMessage name="id" component="div" />
            </div>

            <div>
              <label htmlFor="name">Name</label>
              <Field type="text" id="name" name="name" />
              <ErrorMessage name="name" component="div" />
            </div>

            <div>
              <label htmlFor="email">Email</label>
              <Field type="email" id="email" name="email" />
              <ErrorMessage name="email" component="div" />
            </div>

            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700"
            >
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
            <ErrorMessage
              name="role"
              component="div"
              className="text-red-500 text-sm mt-1"
            />

            <div>
              <label htmlFor="phone">Phone</label>
              <Field type="text" id="phone" name="phone" />
              <ErrorMessage name="phone" component="div" />
            </div>
            <div>
              <label htmlFor="address">Address</label>
              <Field type="text" id="address" name="address" />
              <ErrorMessage name="address" component="div" />
            </div>

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Updating..." : "Update User"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UpdateUserComponent;
