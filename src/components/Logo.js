import { Link as RouterLink } from "react-router-dom";
import { Box } from "@mui/material";
import logoImg from "../logo.png";
import { useSearch } from "../contexts/SearchContext";

function Logo() {
  let search = useSearch();
  const logo = (
    <Box sx={{ width: 40, height: 40, pt: 0.5 }}>
      <img
        src={logoImg}
        alt="logo"
        width={"100%"}
        onClick={() => {
          search.inputQuery("");
        }}
      />
    </Box>
  );
  return <RouterLink to="/">{logo}</RouterLink>;
  //   return <>{logo}</>;
}

export default Logo;
