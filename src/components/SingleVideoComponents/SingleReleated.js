import { Button, CircularProgress } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const SingleReleated = ({
  videoId,
  title,
  channelTitle,
  videoDescription,
  thumb,
}) => {
  const scrollTop = () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  };
  const [isLoading, setIsLoading] = useState(true);
  return (
    <>
      <Link
        to={`/watch/${videoId}`}
        style={{ textDecoration: "none" }}
        onClick={scrollTop}
      >
        <Card
          style={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <CardContent>
              <Typography>{title}</Typography>
              <Typography variant="subtitle1" color="textSecondary">
                <div
                  style={{
                    margin: "10px",
                    textDecoration: "none",
                    display: "flex",
                    padding: "5px",
                    color: "#444",
                    background: "#f7f7f7",
                    justifyContent: "center",
                  }}
                >
                  <Button variant="contained" disabled>
                    {channelTitle}
                  </Button>
                </div>
              </Typography>
            </CardContent>
          </div>
          {isLoading && (
            <CircularProgress
              color="secondary"
              style={{ padding: "125px", display: "flex", margin: "auto" }}
            />
          )}
          <img
            onLoad={() => {
              setIsLoading(false);
            }}
            src={thumb}
            alt={videoId}
            style={{
              height: "165px",
              width: "230px",
              borderTopLeftRadius: "50px",
              borderBottomLeftRadius: "50px",
              display: `${isLoading ? "none" : "block"}`,
            }}
          />
        </Card>
      </Link>
    </>
  );
};

export default SingleReleated;
