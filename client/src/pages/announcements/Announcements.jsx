import React, { useEffect } from "react";
import {
  Box,
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Header from "components/Header";
import {
  deleteAnnouncements,
  getAnnouncements,
} from "state/actions/announcementActions";
import { Link, useNavigate } from "react-router-dom";

export default function Announcements() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigate("/loginRequired");
    }
  }, [userInfo, navigate]);

  const listAnnouncements = useSelector((state) => state.announcements);
  const { announcementsInfo } = listAnnouncements;

  useEffect(() => {
    dispatch(getAnnouncements());
  }, [dispatch]);

  const announcementDelete = useSelector((state) => state.announcementDelete);
  const { success } = announcementDelete;

  const handleDelete = (id) => {
    dispatch(deleteAnnouncements(id));
  };

  useEffect(() => {
    if (success) {
      window.location.reload();
    }
  }, [success, dispatch]);

  return (
    <>
      <Box m="1.5rem 2.5rem">
        <Header
          title="Announcements"
          subtitle=""
          button={
            userInfo?.role !== "admin" ? null : (
              <Button
                component={Link}
                to="/announcements/create-announcements"
                variant="contained"
              >
                Create Announcements
              </Button>
            )
          }
        />
      </Box>
      <Box sx={{ mt: 4, ml: 5, mr: 5 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Message</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          {announcementsInfo?.length === 0 ? (
            <TableBody>
              <TableRow>
                <TableCell
                  style={{ height: "200px", textAlign: "center" }}
                  colSpan={3}
                >
                  No announcements to Display
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              {announcementsInfo?.map((announcement) => (
                <TableRow key={announcement._id}>
                  <TableCell>
                    {new Date(announcement.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{announcement.title}</TableCell>
                  <TableCell>{announcement.message}</TableCell>
                  {userInfo.role === "admin" && (
                    <TableCell>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDelete(announcement._id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </Box>
    </>
  );
}
