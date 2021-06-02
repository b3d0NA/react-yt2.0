import { CircularProgress, Container, Grid } from "@material-ui/core";
import React from "react";
import { useGlobalContext } from "../../api/context";
import Video from "./Video";
const VideosContainer = () => {
  const { videos, isLoading } = useGlobalContext();

  if (isLoading) {
    return (
      <CircularProgress
        color="secondary"
        style={{ padding: "125px", display: "flex", margin: "auto" }}
      />
    );
  }
  if (videos.length <= 0) {
    return (
      <h2 style={{ textAlign: "center" }}>
        Sorry! We did not find any video for your search query.
      </h2>
    );
  }
  return (
    <Container maxWidth="xl">
      <Grid container spacing={3}>
        {videos.map((item) => {
          const { etag } = item;
          const { videoId } = item.id;
          const { title, channelId, channelTitle, description } = item.snippet;
          const { url } = item.snippet.thumbnails.high;
          const videoInfo = {
            videoId,
            title,
            channelId,
            channelTitle,
            videoDescription: description,
            thumb: url,
          };
          return (
            <Grid item xs={3} key={etag}>
              <Video {...videoInfo} />
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default VideosContainer;
