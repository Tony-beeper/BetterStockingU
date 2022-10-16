import { options, doughData } from "../sentimentChart/doughnutChart";
import { Pie } from "test-react-chartjs-2";
const MyDoughChart = (props) => {
  return (
    <Pie
      options={options}
      data={props ? props.data : doughData}
      className="doughnutChart"
    />
  );
};
export default MyDoughChart;
