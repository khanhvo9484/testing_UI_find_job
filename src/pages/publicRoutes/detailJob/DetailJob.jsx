import DefaultLayout from "../../../layout/DefaultLayout";
import Loader from "@mui/material/CircularProgress";

import { Box, Typography, Paper, Button } from "@mui/material";
import { useEffect, useState } from "react";
import useProgressiveImage from "../../../hooks/useProgressiveImage";
import MyAxios from "../../../api/MyAxios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

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
  document.title = "Chi tiết công việc";
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
      <Box>
        {isLoading && (
          <Box sx={{ width: "100%", textAlign: "center" }}>
            <Loader sx={{ marginTop: "5rem" }} size="3rem"></Loader>
          </Box>
        )}

        <Box>
          {!isLoading && (
            <Typography sx={{ padding: "1rem" }} variant="h3">
              Chi tiết công việc
            </Typography>
          )}

          <Box
            sx={{ display: "flex", width: "100%", justifyContent: "center" }}
          >
            <Box style={contentStyle}>
              {jobs && (
                <Paper
                  elevation={3}
                  sx={{ padding: "1rem", margin: "1rem", width: "600px" }}
                  key={jobs.id}
                >
                  <Box sx={{}}>
                    <Typography variant="h6">{jobs.title}</Typography>
                  </Box>
                  <Typography>Luơng: ${jobs?.salary}</Typography>
                  <Box>
                    <Typography>
                      Công ty:{" "}
                      <Typography
                        style={{ fontWeight: "bold", display: "inline" }}
                      >
                        {company?.name}
                      </Typography>
                    </Typography>
                  </Box>
                  <Typography>
                    Địa chỉ:{" "}
                    <Typography
                      style={{ fontWeight: "bold", display: "inline" }}
                    >
                      {company?.location}
                    </Typography>
                  </Typography>
                  <Typography>Mô tả: {jobs?.description}</Typography>

                  <Button
                    sx={{ marginTop: "1rem" }}
                    variant="contained"
                    onClick={() => {
                      navigate(`/job/apply/${jobs.id}`);
                    }}
                  >
                    Nộp CV{" "}
                  </Button>
                </Paper>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </DefaultLayout>
  );
};

export default Home;
