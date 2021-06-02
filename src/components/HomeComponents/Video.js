import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CircularProgress,
  Paper,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../api/context";
const Video = ({
  videoId,
  title,
  channelId,
  channelTitle,
  videoDescription,
  thumb,
}) => {
  const { isLoading } = useGlobalContext();
  const [imgLoad, setImgLoad] = useState(true);
  if (isLoading) {
    return <CircularProgress color="secondary" />;
  }
  return (
    <Link to={`/watch/${videoId}`} style={{ textDecoration: "none" }}>
      <Paper className="yt-video-wrapper">
        <Card className="yt-vide-card">
          <CardActionArea>
            {imgLoad && (
              <CircularProgress
                color="secondary"
                style={{ padding: "125px", display: "flex", margin: "auto" }}
              />
            )}
            <img
              onLoad={() => setImgLoad(false)}
              src={thumb}
              alt={title}
              style={{
                maxWidth: "480px",
                maxHeight: "420px",
                display: `${imgLoad ? "none" : "block"}`,
              }}
            />
            <CardContent component="div">
              <Typography
                gutterBottom
                variant="h5"
                component="h5"
                style={{ fontSize: "1rem" }}
              >
                {title}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {videoDescription}
              </Typography>
            </CardContent>
          </CardActionArea>
          <div
            style={{
              margin: "10px",
              textDecoration: "none",
              display: "flex",
              padding: "20px",
              color: "#444",
              background: "#f7f7f7",
              justifyContent: "center",
            }}
          >
            <Button variant="contained" disabled>
              {channelTitle}
            </Button>
          </div>
        </Card>
      </Paper>
    </Link>
  );
};

export default Video;
