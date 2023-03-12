import { Link as RouterLink } from "react-router-dom";
import { Box } from "@mui/material";
import logoImg from "../logo.png";

function Logo() {
  const logo = (
    <Box sx={{ width: 40, height: 40 }}>
      <img src={logoImg} alt="logo" width={"100%"} />
    </Box>
  );
  return <RouterLink to="/">{logo}</RouterLink>;
  //   return <>{logo}</>;
}

export default Logo;
