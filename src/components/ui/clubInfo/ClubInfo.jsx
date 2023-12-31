import React from "react";
import { Paper, Box, Grid, Typography, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Helper from "../../../utils/Helper";
import { useEffect, useState, useRef } from "react";
import MangerCard from "./MangerCard";
import StadiumCard from "./StadiumCard";
import useEditInfo from "../../../hooks/useEditInfo";
import UploadImageSection from "../UploadImageSection";
import PlayersList from "../../../components/form/PlayersList";
import useProgressiveImage from "../../../hooks/useProgressiveImage";
import clubImagePatterns from "../../../assets/patterns/clubImagePatterns.png";
import clubImagePatterns2 from "../../../assets/patterns/clubImagePatterns2.png";
const useStyles = makeStyles((theme) => ({
  paperContainer: {
    padding: "20px",
    margin: "0 10vw 0 10vw ",
    minHeight: "30vh",
    overflow: "hidden",
    marginTop: "5vh",
  },
  allCenter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));
const ClubInfo = (props) => {
  const { club, manager, homeStadium, players, verticalLayout, isEditable } =
    props;
  const {
    setCurrentClub,
    setCurrentStadium,
    setImageUrl,
    setHasImageOnQueue,
    isFireUpload,
  } = useEditInfo();
  const classes = useStyles();
  const [clubName, setClubName] = useState("");
  const [clubFoundedYear, setClubFoundedYear] = useState("");

  const loadLogoImagePatterns = useProgressiveImage(clubImagePatterns);
  const loadLogoImagePatterns2 = useProgressiveImage(clubImagePatterns2);
  useEffect(() => {
    if (clubName && clubFoundedYear) {
      setCurrentClub({ ten: clubName, namThanhLap: clubFoundedYear });
    }
  }, [clubName, clubFoundedYear]);
  useEffect(() => {
    if (club) {
      setClubName(club.ten);
      setClubFoundedYear(club.namThanhLap);
    }
  }, [club]);
  return (
    <>
      <Grid
        container
        spacing={0}
        justifyContent="space-between"
        sx={{ color: "primary.main" }}
      >
        <Grid item sm={9} container>
          <Grid item lg={12} xs={12}>
            {isEditable ? (
              <TextField
                sx={{ mb: "1rem" }}
                placeholder="Tên đội bóng"
                value={clubName}
                onChange={(e) => setClubName(e.target.value)}
              ></TextField>
            ) : (
              <Typography
                variant="h1"
                sx={{
                  mb: "0.5rem",
                  color: "primary.main",
                  fontFamily: "Jost",
                  textShadow: `2px 2px 0px #adc1f4`,
                }}
              >
                {club?.ten}
              </Typography>
            )}
          </Grid>
          <Paper elevation={0} sx={{ width: "100%", height: "fit-content" }}>
            {!verticalLayout ? (
              <Box justifyContent={"space-between"} sx={{ display: "flex" }}>
                <MangerCard manager={manager}></MangerCard>
                <StadiumCard homeStadium={homeStadium}></StadiumCard>
              </Box>
            ) : (
              <Box
                sx={{
                  width: "100%",
                }}
              >
                <Box sx={{ margin: "0 auto" }}>
                  <MangerCard
                    manager={manager}
                    verticalLayout={verticalLayout}
                  ></MangerCard>
                </Box>
                <Box sx={{ marginTop: "2rem" }}>
                  <StadiumCard
                    homeStadium={homeStadium}
                    verticalLayout={verticalLayout}
                    isEditable={isEditable}
                    setCurrentStadium={setCurrentStadium}
                  ></StadiumCard>
                </Box>
              </Box>
            )}
          </Paper>
          <Box sx={{ mt: "1rem", width: "100%" }}>
            {players && players.length > 0 ? (
              <>
                <Box
                  sx={{
                    mt: "1rem",
                  }}
                >
                  <PlayersList
                    data={players}
                    headerSize={"h5"}
                    alignHeader={"left"}
                    number={6}
                  ></PlayersList>
                </Box>
              </>
            ) : null}
          </Box>
        </Grid>
        <Grid
          item
          sm={3}
          sx={{
            backgroundImage: `url(${loadLogoImagePatterns2})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          {isEditable ? (
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <UploadImageSection />
            </Box>
          ) : (
            <Box className={classes.allCenter} sx={{ paddingTop: "2rem" }}>
              <img style={{ width: "200px" }} src={club?.hinhAnh}></img>
            </Box>
          )}

          <Box className={classes.allCenter} sx={{ mt: "1rem" }}>
            <Typography
              variant="h6"
              sx={{
                boxShadow: (theme) => {
                  theme.shadows[2];
                },
              }}
            >
              Năm thành lập:{" "}
            </Typography>
            {isEditable ? (
              <TextField
                sx={{
                  maxWidth: "8rem",
                }}
                size="small"
                placeholder="Năm thành lập"
                value={clubFoundedYear}
                onChange={(e) => setClubFoundedYear(e.target.value)}
              ></TextField>
            ) : (
              <Typography variant="h6" sx={{ ml: "0.5rem" }}>
                {club?.namThanhLap}{" "}
              </Typography>
            )}
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default ClubInfo;
