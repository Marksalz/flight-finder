import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

import { Card, Grid } from "@mui/material";

import {
  durationInHours,
  getAirlineCode,
  getDepTime,
  getArrTime,
} from "../../utils/helpFunctions";
import { selectAirportById } from "../../features/airports/airportsSlice";
import { selectFlight } from "../../features/flights/flightsSlice";
import OriginDestination from "../genericComponents/OriginDestination";
import FlightCardImage from "./FlightCardImage";
import FlightCardRoute from "./FlightCardRoute";
import FlightCardActionsPrice from "./FlightCardActionsPrice";
import FlightCardDivider from "./FlightCardDivider";
import "../../styles/flightCard.css";

export default function FlightCard({
  flightInfo,
  isClickable,
  isExpanded,
  isAdmin = false,
  onEdit,
  onDelete,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const airlineCode = getAirlineCode(flightInfo?.flightNumber);
  const depTime = getDepTime(flightInfo.departureTime);
  const arrTime = getArrTime(flightInfo.arrivalTime);

  const originCode = useSelector(selectAirportById(flightInfo?.origin)).code;
  const destinationCode = useSelector(
    selectAirportById(flightInfo?.destination)
  ).code;

  const handleClick = () => {
    dispatch(selectFlight(flightInfo));
  };

  return (
    <Card
      onClick={
        isClickable &&
        ((event) => {
          event.stopPropagation();
          dispatch(selectFlight(flightInfo));
          navigate(`/flight/${flightInfo.id}`);
        })
      }
      sx={{
        p: 1,
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: { xs: "stretch", sm: "center" },
        justifyContent: { xs: "stretch", sm: "space-evenly" },
        gap: { xs: 0, sm: 4.5 },
        backgroundColor: "#b6ccecff",
        boxShadow: "none",
        width: { xs: "100%", sm: "100%", md: "90%" },
        minHeight: 100,
        height: { xs: "auto", sm: "auto" },
        transition: "transform 200ms ease, box-shadow 200ms ease",
        ...(isClickable && {
          borderRadius: 4,
          "&:hover": {
            cursor: "pointer",
            transform: "scale(1.03)",
            boxShadow: 6,
            zIndex: 2,
          },
        }),
        ...(!isClickable && {
          borderTopLeftRadius: 16,
          borderBottomLeftRadius: { xs: 0, sm: 0, md: 16 },
          borderTopRightRadius: { xs: 16, md: 0 },
          borderBottomRightRadius: { xs: 0, sm: 0, md: 0 },
          cursor: "default",
        }),
        ...(isExpanded && {
          borderBottomLeftRadius: 0,
          transition: "border-radius 0.4s",
        }),
      }}
    >
      <FlightCardImage airlineCode={airlineCode} />

      <Grid
        container
        alignItems="center"
        justifyContent="center"
        flexDirection="row"
        flexWrap={"nowrap"}
        spacing={2}
        width={{ xs: "100%", sm: "60%" }}
        sx={{ textAlign: "left" }}
      >
        <FlightCardRoute
          depTime={depTime}
          arrTime={arrTime}
          originCode={originCode}
          destinationCode={destinationCode}
          duration={durationInHours(flightInfo.durationMinutes)}
          date={new Date(flightInfo.date).toLocaleDateString("en-GB")}
          isClickable={isClickable}
          OriginDestination={OriginDestination}
        />
      </Grid>

      <FlightCardDivider
        orientation="horizontal"
        sx={{
          display: { xs: "block", sm: "none" },
          my: 1,
          borderColor: "grey.600",
        }}
      />

      <FlightCardDivider
        orientation="vertical"
        sx={{ display: { xs: "none", sm: "block" }, borderColor: "grey.600" }}
      />

      <FlightCardActionsPrice
        isAdmin={isAdmin}
        onEdit={onEdit}
        onDelete={onDelete}
        onClick={handleClick}
        price={formatPrice(flightInfo.price.amount, flightInfo.price.currency)}
      />
    </Card>
  );
}

function formatPrice(amount, currency) {
  const numericAmount = Number(amount);
  let formattedPrice;
  try {
    formattedPrice = new Intl.NumberFormat(undefined, {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(numericAmount);
  } catch {
    formattedPrice = `${numericAmount} ${currency || ""}`.trim();
  }

  return formattedPrice;
}
