import DefaultLayout from "../../../layout/DefaultLayout";
import Loader from "@mui/material/CircularProgress";

import { Box, Typography, Paper, Button } from "@mui/material";
import { useEffect, useState } from "react";
import useProgressiveImage from "../../../hooks/useProgressiveImage";
import MyAxios from "../../../api/MyAxios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import CustomSnackbar from "../../../components/ui/CustomSnackbar";
import ComponentLayoutBackdrop from "../../../layout/ComponentLayoutBackdrop";
const Home = () => {
  const navigate = useNavigate();
  const contentStyle = {
    display: "flex",
    flexWrap: "wrap",
  };

  const { id } = useParams();
  const [jobs, setJobs] = useState([]);
  const [company, setCompany] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [notify, setNotify] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null); // State to store the selected file
  const { auth } = useAuth();
  document.title = "Chi tiết công việc";

  const [isOpenSnackbar, setIsOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState("success");

  const [isLoadingBackdrop, setIsLoadingBackdrop] = useState(false);
  const [notifyBackdrop, setNotifyBackdrop] = useState({
    message: "",
    type: "",
  });

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  // Function to upload the selected file
  const uploadFile = async () => {
    if (selectedFile) {
      // Create a FormData object to send the file as a multipart/form-data
      const formData = new FormData();
      formData.append("file", selectedFile); // Use "file" to match the @RequestParam("file") on the backend
      formData.append("info", "nothing");
      formData.append("id_job", id);
      try {
        setIsLoadingBackdrop(true);
        const res = await MyAxios.post(`/resumes/upload`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${auth?.token?.accessToken}`,
          },
        });

        setSnackbarMessage("Upload CV thành công");
        setSnackbarType("success");
        setIsOpenSnackbar(true);

        // Handle the response from the server as needed
        console.log("File uploaded successfully:", res);
      } catch (error) {
        // Handle the error
        setSnackbarMessage("Upload CV thất bại");
        setSnackbarType("error");
        setIsOpenSnackbar(true);
        console.error("File upload error:", error);
      } finally {
        setIsLoadingBackdrop(false);
      }
    }
  };

  const getJobs = async () => {
    try {
      const res = await MyAxios.get(`/job/${id}/detail`);
      setJobs(res?.data?.data?.job);
      setCompany(res?.data?.data?.company);
    } catch (error) {
      // setNotify(() => [...error.response.data.message]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    setNotify([]);
    getJobs();
  }, []);

  return (
    <DefaultLayout>
      <CustomSnackbar
        isOpen={isOpenSnackbar}
        setIsOpen={setIsOpenSnackbar}
        message={snackbarMessage}
        type={snackbarType}
      ></CustomSnackbar>
      <Box>
        {isLoading && (
          <Box sx={{ width: "100%", textAlign: "center" }}>
            <Loader sx={{ marginTop: "5rem" }} size="3rem"></Loader>
          </Box>
        )}

        <Box>
          {!isLoading && (
            <Typography sx={{ padding: "1rem" }} variant="h3">
              Upload CV
            </Typography>
          )}
          <ComponentLayoutBackdrop
            isLoading={isLoadingBackdrop}
            notify={notifyBackdrop}
          >
            <Box
              sx={{ display: "flex", width: "100%", justifyContent: "center" }}
            >
              <Box style={contentStyle}>
                {jobs && (
                  <Paper
                    elevation={3}
                    sx={{ padding: "1rem", margin: "1rem" }}
                    key={jobs.id}
                  >
                    <Box sx={{}}>
                      <Typography variant="h6">{jobs.title}</Typography>
                    </Box>

                    <Typography>Lương: ${jobs.salary}</Typography>
                    <Typography>Công ty: {company?.name}</Typography>
                    {selectedFile && (
                      <Typography sx={{ marginTop: "1rem" }}>
                        File CV: {selectedFile.name}
                      </Typography>
                    )}
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-around",
                        marginTop: "1rem",
                      }}
                    >
                      <label htmlFor="file-upload" style={{ display: "block" }}>
                        <Button variant="contained" component="span">
                          Chọn CV
                        </Button>
                      </label>
                      <input
                        type="file"
                        id="file-upload"
                        style={{ display: "none" }}
                        onChange={handleFileSelect}
                      />
                      <Button
                        name="upload-cv"
                        variant="contained"
                        onClick={uploadFile}
                      >
                        Tải lên CV
                      </Button>
                    </Box>
                  </Paper>
                )}
              </Box>
            </Box>
          </ComponentLayoutBackdrop>
        </Box>
      </Box>
    </DefaultLayout>
  );
};

export default Home;
