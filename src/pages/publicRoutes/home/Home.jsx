import DefaultLayout from "../../../layout/DefaultLayout";
import Loader from "@mui/material/CircularProgress";

import { Box, Typography, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import useProgressiveImage from "../../../hooks/useProgressiveImage";
import MyAxios from "../../../api/MyAxios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const contentStyle = {
    display: "flex",
    flexWrap: "wrap",
  };
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [notify, setNotify] = useState([]);
  document.title = "Trang chủ";
  const getJobs = async () => {
    try {
      const res = await MyAxios.get(`/job/all?page=1&limit=10`);
      setJobs(res?.data?.data?.listJob);
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
              Danh sách công việc
            </Typography>
          )}

          <Box sx={{ margin: "0 auto", width: "100%" }}>
            <Box style={contentStyle}>
              {jobs &&
                jobs.map((job) => {
                  return (
                    <Paper
                      elevation={3}
                      sx={{
                        padding: "1rem",
                        margin: "1rem",
                        width: "300px",
                        "&:hover": {
                          cursor: "pointer",
                          backgroundColor: "#e3f4fd",
                        },
                      }}
                      key={job.id}
                      onClick={() => {
                        navigate(`/detail-job/${job.id}`);
                      }}
                    >
                      <Box sx={{ minHeight: "3rem" }}>
                        <Typography variant="h6">{job.title}</Typography>
                      </Box>
                      <Typography>${job.salary}</Typography>
                      <Typography>{job.nameCompany}</Typography>
                      <Typography>{job.numDayPost}</Typography>
                    </Paper>
                  );
                })}
            </Box>
          </Box>
        </Box>
      </Box>
    </DefaultLayout>
  );
};

export default Home;
