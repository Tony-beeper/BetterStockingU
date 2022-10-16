import { options, doughData2 } from "../sentimentChart/doughnutChart";
import { Doughnut } from "test-react-chartjs-2";
const realDough = (props) => {
  return (
    <Doughnut
      options={options}
      data={props ? props.data : doughData2}
      className="doughnutChart"
    />
  );
};
export default realDough;
