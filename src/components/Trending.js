import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import PaginationItem from "@mui/material/PaginationItem";
import Divider from "@mui/material/Divider";
import Skeleton from "@mui/material/Skeleton";
import MCard from "./MCard";

function Trending({ trendingList, cutInitial, loadingTrending }) {
  const [cutList, setCutList] = useState();
  //   const [copiedList, setCopiedList] = useState([]);
  const [pageCounter, setPageCounter] = useState(1);

  //   function handleList() {
  //     let y;
  //     if (copiedList.length === 0) {
  //       setCopiedList([...trendingList]);
  //       y = [...trendingList].slice(0, 4);
  //       copiedList.splice(0, 4);
  //     } else if (copiedList.length === 4) {
  //       setCopiedList([...trendingList]);
  //       y = copiedList.splice(0, 4);
  //     } else {
  //       y = copiedList.splice(4, 4);
  //     }
  //     return y;
  //   }

  function handleListForward() {
    let tempArr;
    let nextPage = pageCounter + 1;
    const sliceEnd = nextPage * 4;
    const sliceStart = sliceEnd - 4;

    if (nextPage < 6) {
      tempArr = [...trendingList].slice(sliceStart, sliceEnd);
      setPageCounter(pageCounter + 1);
    } else if (nextPage === 6) {
      tempArr = [...trendingList].slice(sliceStart - 4, sliceEnd - 4);
    }
    return tempArr;
  }

  function handleListBackward() {
    let tempArr;
    let nextPage = pageCounter - 1;
    const sliceEnd = nextPage * 4;
    const sliceStart = sliceEnd - 4;

    if (nextPage > 0) {
      tempArr = [...trendingList].slice(sliceStart, sliceEnd);
      setPageCounter(pageCounter - 1);
    } else if (nextPage === 0) {
      tempArr = [...trendingList].slice(sliceStart + 4, sliceEnd + 4);
    }
    return tempArr;
  }

  const placeholder = [0, 1, 2, 3]; //for skeleton rendering
  const detailSkeleton = (
    <Stack spacing={1}>
      <Skeleton variant="text" />
      <Skeleton variant="rectangular" width="100%" height={300} />
    </Stack>
  );
  return (
    <>
      <Stack
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h5" my={3}>
          TRENDING
        </Typography>
        <Stack>
          <PaginationItem
            onClick={() => setCutList(handleListBackward())}
            type="previous"
          />
          <PaginationItem
            onClick={() => setCutList(handleListForward())}
            type="next"
          />
        </Stack>
      </Stack>
      <Divider />
      <Grid container direction="row" spacing={5} mt={2}>
        {loadingTrending
          ? placeholder.map((item) => (
              <Grid key={item.id} item xs={6} sm={4} md={3}>
                {detailSkeleton}
              </Grid>
            ))
          : cutList
          ? cutList.map((item) => (
              <Grid key={item.id} item xs={6} sm={4} md={3}>
                <MCard item={item} />
              </Grid>
            ))
          : cutInitial?.map((item) => (
              <Grid key={item.id} item xs={6} sm={4} md={3}>
                <MCard item={item} />
              </Grid>
            ))}
      </Grid>
    </>
  );
}

export default Trending;
