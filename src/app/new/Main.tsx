import React from "react";
import AddUser from "./AddUser";
import { deleteUser } from "../../restAPIs/user";
import UpdateUserComponent from "./UpdateUser";

const Main = () => {
  const handleSubmit = async (id: number) => {
    try {
      const result = await deleteUser(id);
      if (result) {
        console.log("user Deleted successfully");
      }
    } catch (error: any) {
      throw new Error(error);
    }
  };
  return (
    <div onClick={() => handleSubmit(1)}>
      <AddUser />
      {/* <UpdateUserComponent/> */}
    </div>
  );
};

export default Main;
