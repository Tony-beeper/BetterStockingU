import { withStyles } from "@material-ui/core/styles";
import { Typography, createTheme } from "@material-ui/core";

const WhiteTextTypography = withStyles({
  root: {
    color: "#000000",
  },
})(Typography);

export default WhiteTextTypography;
