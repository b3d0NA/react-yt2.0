import {
  Avatar,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  IconButton,
  Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import React, { useState } from "react";
import { abbreviateNumber } from "../../api/helper";

const SingleBig = ({ video, id, channel }) => {
  const [expanded, setExpanded] = useState(false);
  const { channelTitle, description, title } = video.snippet;
  const { viewCount } = video.statistics;
  const { url: channelThumb } = channel.snippet.thumbnails.default;
  const { subscriberCount: subscriber } = channel.statistics;
  return (
    <>
      <CardContent>
        <CardHeader
          avatar={
            <Avatar src={channelThumb} aria-label={channelTitle}></Avatar>
          }
          title={channelTitle}
          subheader={`${
            subscriber === undefined
              ? "Subscription is private"
              : abbreviateNumber(subscriber)
          } subscribers`}
          style={{
            textAlign: "center",
            background: "#f1f1f1",
            borderTopLeftRadius: "20px",
            borderTopRightRadius: "20px",
          }}
        />
        <iframe
          width="100%"
          height="700"
          src={`https://www.youtube.com/embed/${id}`}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <CardContent>
          <Typography
            component="h2"
            style={{ color: "#111", fontSize: "22px" }}
          >
            {title}
          </Typography>
          <Typography component="p" color="textSecondary">
            {abbreviateNumber(viewCount)} views
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton
            aria-label="show more"
            onClick={() => setExpanded(!expanded)}
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>{description}</Typography>
          </CardContent>
        </Collapse>
      </CardContent>
    </>
  );
};

export default SingleBig;
