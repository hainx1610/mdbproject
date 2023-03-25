import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import PaginationItem from "@mui/material/PaginationItem";
import Divider from "@mui/material/Divider";
import Skeleton from "@mui/material/Skeleton";
import MCard from "./MCard";
import { useSearch } from "../contexts/SearchContext";
import apiService from "../api/apiService";
import { API_KEY } from "../api/config";

function SearchResults() {
  let search = useSearch();

  const [cutList, setCutList] = useState();
  //   const [copiedList, setcopiedList] = useState([]);
  const [loadingSearchList, setLoadingSearchList] = useState();
  const [searchList, setSearchList] = useState([]);
  const [cutInitialSearch, setCutInitialSearch] = useState();
  const [pageCounter, setPageCounter] = useState(1);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingSearchList(true);
        const res = await apiService.get(
          `/search/movie?api_key=${API_KEY}&query=${search.queryWord}`
        );

        const result = res.data.results;
        console.log(result);
        setSearchList(result);
        setCutInitialSearch([...result].splice(4, 4));
        setLoadingSearchList(false);
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchData();
  }, [search.queryWord]);

  //   function handleList() {
  //     let y;
  //     if (copiedList.length === 0) {
  //       setcopiedList([...searchList]);
  //       y = [...searchList].slice(0, 4);
  //       copiedList.splice(0, 4);
  //     } else if (copiedList.length === 4) {
  //       setcopiedList([...searchList]);
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
      tempArr = [...searchList].slice(sliceStart, sliceEnd);
      setPageCounter(pageCounter + 1);
    } else if (nextPage === 6) {
      tempArr = [...searchList].slice(sliceStart - 4, sliceEnd - 4);
    }
    return tempArr;
  }

  function handleListBackward() {
    let tempArr;
    let nextPage = pageCounter - 1;
    const sliceEnd = nextPage * 4;
    const sliceStart = sliceEnd - 4;

    if (nextPage > 0) {
      tempArr = [...searchList].slice(sliceStart, sliceEnd);
      setPageCounter(pageCounter - 1);
    } else if (nextPage === 0) {
      tempArr = [...searchList].slice(sliceStart + 4, sliceEnd + 4);
    }
    return tempArr;
  }

  const placeholder = [0, 1, 2, 3];
  const detailSkeleton = (
    <Stack spacing={1}>
      <Skeleton variant="text" />
      <Skeleton variant="rectangular" width="100%" height={300} />
    </Stack>
  );
  return (
    <>
      {search.queryWord && (
        <>
          <Stack
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h5" my={3}>
              SEARCH RESULTS
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
          <Grid container direction="row" spacing={5} mt={2} mb={8}>
            {loadingSearchList
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
              : cutInitialSearch?.map((item) => (
                  <Grid key={item.id} item xs={6} sm={4} md={3}>
                    <MCard item={item} />
                  </Grid>
                ))}
          </Grid>
        </>
      )}
    </>
  );
}

export default SearchResults;
