
import React, { useState } from "react";
import { Modal, Box, Typography, Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import UserForm from "./UserForm";
import { createUser } from "@/restAPIs/user";
import SnackbarAlert from "../common/SnackbarAlert";

interface CreateUserModalProps {
    setShowingUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

const CreateUserModal: React.FC<CreateUserModalProps> = ({ setShowingUsers }) => {
    const [open, setOpen] = useState<boolean>(false);
    const [openSucess, setOpenSucess] = useState<boolean>(false);
    const [openError, setOpenError] = useState<boolean>(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleAddUser = async (data: any) => {
        try {
            const res = await createUser(data)
            setShowingUsers(prev => [res.data, ...prev])
            setOpenSucess(true)
            handleClose()
        } catch (error) {
            setOpenError(true)
            console.log(error)
        }
    }
    return (
        <>
            {/* Button to open modal */}
            <Button
                variant="contained"
                color="primary"
                onClick={handleOpen}
                sx={{
                    textTransform: "capitalize",
                    fontWeight: "bold",
                }}
            >
                Create New User
            </Button>

            {/* Modal */}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="create-user-modal-title"
                aria-describedby="create-user-modal-description"
            >
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 500,
                        bgcolor: "background.paper",
                        borderRadius: 2,
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    {/* Header Section */}
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mb: 3,
                        }}
                    >
                        <Typography
                            id="create-user-modal-title"
                            variant="h6"
                            component="h2"
                            sx={{ fontWeight: "bold", color: "text.primary" }}
                        >
                            Create User
                        </Typography>
                        <IconButton
                            aria-label="close"
                            onClick={handleClose}
                            sx={{
                                color: "text.secondary",
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Box>

                    {/* Form Section */}
                    <UserForm
                        onSubmit={handleAddUser}
                    />
                </Box>
            </Modal>
            <SnackbarAlert
                message="User Created Successfully"
                autoHideDuration={5000}
                open={openSucess}
                setOpen={setOpenSucess}
                type="success"
            />
            <SnackbarAlert
                message="Error in creating User"
                autoHideDuration={5000}
                open={openError}
                setOpen={setOpenError}
                type="error"
            />
        </>
    );
};

export default CreateUserModal;
