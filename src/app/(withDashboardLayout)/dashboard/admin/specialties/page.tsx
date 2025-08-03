"use client";

import {
    Box,
    Button,
    CircularProgress,
    IconButton,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { useState } from "react";
import {
    useDeleteSpecialtyMutation,
    useGetAllSpecialtiesQuery,
} from "@/redux/api/specialtiesApi";
import Image from "next/image";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "sonner";
import SpecialtyModal from "./components/SpecialtyModal";

const SpecialtiesPage = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const { data, isLoading } = useGetAllSpecialtiesQuery({});
    const [deleteSpecialty] = useDeleteSpecialtyMutation();

    const handleDelete = async (id: string) => {
        try {
            const res = await deleteSpecialty(id).unwrap();
            if (res?.id) {
                toast.success("Specialty deleted successfully!");
            }
        } catch (err: any) {
            console.error(err.message);
            toast.error("Failed to delete specialty.");
        }
    };

    const columns: GridColDef[] = [
        { field: "title", headerName: "Title", width: 400 },
        {
            field: "icon",
            headerName: "Icon",
            flex: 1,
            renderCell: ({ row }) => (
                <Box>
                    <Image src={row.icon} width={30} height={30} alt="icon" />
                </Box>
            ),
        },
        {
            field: "action",
            headerName: "Action",
            flex: 1,
            headerAlign: "center",
            align: "center",
            renderCell: ({ row }) => (
                <IconButton onClick={() => handleDelete(row.id)} aria-label="delete">
                    <DeleteIcon />
                </IconButton>
            ),
        },
    ];

    return (
        <Box p={3}>
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={2}
                mb={2}
            >
                <Button onClick={() => setIsModalOpen(true)}>Create Specialty</Button>
                <TextField size="small" placeholder="Search Specialist" />
            </Stack>

            <SpecialtyModal open={isModalOpen} setOpen={setIsModalOpen} />

            {isLoading ? (
                <Box display="flex" justifyContent="center" alignItems="center" height={200}>
                    <CircularProgress />
                </Box>
            ) : data && data.length === 0 ? (
                <Typography textAlign="center" color="text.secondary" mt={4}>
                    No specialties found.
                </Typography>
            ) : (
                <Box my={2} sx={{ width: "100%" }}>
                    <DataGrid
                        rows={data}
                        columns={columns}
                        hideFooter
                        autoHeight
                        getRowId={(row) => row.id || row._id} // fallback if needed
                    />
                </Box>
            )}
        </Box>
    );
};

export default SpecialtiesPage;
