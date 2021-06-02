import { CircularProgress, Grid } from "@material-ui/core";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGlobalContext } from "../../api/context";
import youtube from "../../api/youtube";
import Navbar from "../Navbar";
import SingleBig from "./SingleBig";
import SingleReleated from "./SingleReleated";
const SinglePageContainer = () => {
  const { id } = useParams();
  const [video, setVideo] = useState([]);
  const [channel, setChannel] = useState([]);
  const [loading, setLoading] = useState(true);
  const { videos } = useGlobalContext();
  const fetchVideoInfo = useCallback(async () => {
    try {
      const response_videos = await youtube.get("videos", {
        params: {
          part: "statistics, snippet",
          id: id,
          key: "AIzaSyCjhZ5-QEBerGFttIJqKl7cS15u3h00bmE",
        },
      });
      const videos = response_videos.data.items[0];
      const response_channels = await youtube.get("channels", {
        params: {
          part: "statistics, snippet",
          id: videos.snippet.channelId,
          key: "AIzaSyCjhZ5-QEBerGFttIJqKl7cS15u3h00bmE",
        },
      });
      setVideo(videos);
      const channel_info = response_channels.data.items[0];
      setChannel(channel_info);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, [id]);
  useEffect(() => {
    fetchVideoInfo();
  }, [id, fetchVideoInfo]);
  if (loading) {
    return (
      <>
        <Navbar />
        <CircularProgress
          color="secondary"
          style={{ padding: "125px", display: "flex", margin: "auto" }}
        />
      </>
    );
  }
  return (
    <>
      <Navbar />
      <Grid container spacing={2}>
        <Grid item xs={9}>
          <SingleBig video={video} id={id} channel={channel} />
        </Grid>
        <Grid item xs={3}>
          {videos
            .slice(0)
            .reverse()
            .map((item) => {
              const { etag } = item;
              const { videoId } = item.id;
              const { title, channelId, channelTitle, description } =
                item.snippet;
              const { url } = item.snippet.thumbnails.high;
              const videoInfo = {
                videoId,
                title,
                channelId,
                channelTitle,
                videoDescription: description,
                thumb: url,
              };
              return <SingleReleated key={etag} {...videoInfo} />;
            })}
        </Grid>
      </Grid>
    </>
  );
};

export default SinglePageContainer;
