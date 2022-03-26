import { Bar } from "react-chartjs-2";
//import { Page, getLabel } from "../pages/anime"

const BarShow = () => {
  const data1 = {
    labels: [
      //getLabel(Page),
      "Anime1",
      "Anime2",
      "Anime3",
      "Anime4"
    ],
    datasets: [
      {
        label: "Popularity",
        data: [
          3547,
          9723,
          4203,
          7324,
        ],
        backgroundColor: 'rgb(128, 0, 128)',

      },
    ],
  };
  const output = <Bar data={data1} height={400} width={600}/>;
  return output;
};

export default BarShow;