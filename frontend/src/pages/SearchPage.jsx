import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import dayjs from "dayjs";

import { Box, Container } from "@mui/material";

import {
  selectAllUserParams,
  setUserSearchParams,
} from "../features/search/searchSlice";
import SearchPageHeader from "../components/searchPage/SearchPageHeader";
import SearchFormBox from "../components/searchPage/SearchFormBox";
import { selectAirports } from "../features/airports/airportsSlice";

export default function SearchPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const airports = useSelector(selectAirports);
  const userSearchParams = useSelector(selectAllUserParams);

  const [formData, setFormData] = useState({
    origin: userSearchParams.origin,
    destination: userSearchParams.destination,
    depDate:
      userSearchParams.depDate !== "" && userSearchParams.depDate != null
        ? dayjs(userSearchParams.depDate)
        : null,
    retDate:
      userSearchParams.retDate !== "" && userSearchParams.retDate != null
        ? dayjs(userSearchParams.retDate)
        : null,
  });

  useEffect(() => {
    setFormData({
      origin: userSearchParams.origin,
      destination: userSearchParams.destination,
      depDate:
        userSearchParams.depDate !== "" && userSearchParams.depDate != null
          ? dayjs(userSearchParams.depDate)
          : null,
      retDate:
        userSearchParams.retDate !== "" && userSearchParams.retDate != null
          ? dayjs(userSearchParams.retDate)
          : null,
    });
  }, [userSearchParams]);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(
      setUserSearchParams({
        origin: formData.origin,
        destination: formData.destination,
        depDate: formData.depDate ? formData.depDate.format("YYYY-MM-DD") : "",
        retDate: formData.retDate ? formData.retDate.format("YYYY-MM-DD") : "",
      })
    );
    navigate("/results");
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        width: "90%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        background: "#CEDDF0",
        borderRadius: 4,
        margin: "3% auto",
        px: { xs: 2, sm: 4 },
        py: { xs: 2, sm: 4 },
      }}
    >
      <Box
        component="img"
        src="/images/app_logo4.png"
        alt="app logo"
        sx={{
          maxWidth: { xs: 200, sm: 400 },
          width: "100%",
          height: "auto",
          display: "block",
          margin: "0 auto",
        }}
      />
      <Box
        sx={{
          width: "100%",
          maxWidth: { xs: "90%", sm: 500, md: 600 },
          bgcolor: "rgba(255,255,255,0.95)",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.2)",
          borderRadius: { xs: 2, sm: 3, md: 4 },
          p: { xs: 2, sm: 3, md: 5 },
          mx: "auto",
          backdropFilter: "blur(4px)",
          backgroundColor: "#a6c3e9ab",
        }}
      >
        <SearchPageHeader />
        <SearchFormBox
          handleSubmit={handleSubmit}
          airports={airports}
          formData={formData}
          setFormData={setFormData}
        />
      </Box>
    </Container>
  );
}
