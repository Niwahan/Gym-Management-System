import {
  TableContainer,
  Table,
  TableRow,
  TableCell,
  CircularProgress,
  Alert,
  TableBody,
} from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Header from "components/Header";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, useTheme } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { updateMembersProgress } from "state/actions/memberProgressActions";

export default function SingleMemberProgress() {
  const { id } = useParams();
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [serviceName, setServiceName] = useState("");
  const [initialWeight, setInitialWeight] = useState(0);
  const [finalWeight, setFinalWeight] = useState(0);
  const [initialBodyType, setInitialBodyType] = useState("");
  const [finalBodyType, setFinalBodyType] = useState("");
  console.log(initialWeight, finalWeight);

  const memberProgressUpdate = useSelector(
    (state) => state.memberProgressUpdate
  );
  const { loading, error, success } = memberProgressUpdate;

  const updateHandler = (id) => {
    dispatch(
      updateMembersProgress(
        id,
        initialWeight,
        finalWeight,
        initialBodyType,
        finalBodyType,
        () => {
          setInitialWeight(initialWeight);
          setFinalWeight(finalWeight);
          setInitialBodyType(initialBodyType);
          setFinalBodyType(finalBodyType);
        }
      )
    );
  };
  console.log(id);

  useEffect(() => {
    const fetching = async () => {
      try {
        const { data } = await axios.get(`/api/members/${id}`);

        setName(data.user.name);
        setServiceName(data.service.name);
        setInitialWeight(data.initialWeight);
        setFinalWeight(data.finalWeight);
        setInitialBodyType(data.initialBodyType);
        setFinalBodyType(data.finalBodyType);
      } catch (error) {
        console.log(error);
      }
    };
    fetching();
  }, [id]);

    useEffect(() => {
      if (success) {
        navigate("/members_progress");
      }
    }, [success, navigate]);

  return (
    <>
      <Box m="1.5rem 2.5rem">
        <Header
          title="Member's Progress"
          subtitle=""
          button={
            <Button variant="contained" onClick={() => updateHandler(id)}>
              Update Progress
            </Button>
          }
        />
        <Box
          mt="40px"
          height="75vh"
          sx={{
            "& .MuiTable-root": {
              border: "none",
            },
            "& .MuiTable-cell": {
              borderBottom: "none",
            },
            "& .MuiTable-columnHeaders": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderBottom: "none",
            },
            "&. MuiTable-virtualScroller": {
              backgroundColor: theme.palette.primary.light,
            },
            "&. MuiTable-footerContainer": {
              backgroundColor: theme.palette.primary.light,
              color: theme.palette.secondary[100],
              borderTop: "none",
            },
            "&. MuiTable-toolbarContainer .MuiButton-text": {
              color: `${theme.palette.secondary[200]} !important`,
            },
            "& .MuiTable-toolbarContainer .MuiButton-text": {
              color: `${theme.palette.secondary[200]} !important`,
            },
          }}
        >
          {loading && <CircularProgress />}
          {error && <Alert severity="error">{error}</Alert>}
          <TableContainer>
            <Table sx={{ minWidth: 650 }}>
              <TableBody>
                <TableRow>
                  <TableCell>Member's Full Name : </TableCell>
                  <TableCell>{name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Service Taken : </TableCell>
                  <TableCell>{serviceName}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Initial Weight : </TableCell>
                  <TableCell>
                    <input
                      style={{
                        backgroundColor: theme.palette.primary.light,
                        color: theme.palette.secondary[100],
                        height: "35px",
                      }}
                      type="number"
                      value={initialWeight}
                      onChange={(e) => setInitialWeight(e.target.value)}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Final Weight : </TableCell>
                  <TableCell>
                    <input
                      style={{
                        backgroundColor: theme.palette.primary.light,
                        color: theme.palette.secondary[100],
                        height: "35px",
                      }}
                      type="number"
                      value={finalWeight}
                      onChange={(e) => setFinalWeight(e.target.value)}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Initial Body Type : </TableCell>
                  <TableCell>
                    <input
                      style={{
                        backgroundColor: theme.palette.primary.light,
                        color: theme.palette.secondary[100],
                        height: "35px",
                      }}
                      type="text"
                      value={initialBodyType}
                      onChange={(e) => setInitialBodyType(e.target.value)}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Final Body Type : </TableCell>
                  <TableCell>
                    <input
                      style={{
                        backgroundColor: theme.palette.primary.light,
                        color: theme.palette.secondary[100],
                        height: "35px",
                      }}
                      type="text"
                      value={finalBodyType}
                      onChange={(e) => setFinalBodyType(e.target.value)}
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </>
  );
}
