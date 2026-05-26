import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";


function AnalyticsChart({ records }) {

  const sourceTotals = {};

  records.forEach((r) => {

    if (!sourceTotals[r.source_type]) {
      sourceTotals[r.source_type] = 0;
    }

    sourceTotals[r.source_type] +=
      Number(r.emissions_kg_co2e);
  });


  const chartData = Object.keys(sourceTotals).map((key) => ({
    source: key,
    emissions: sourceTotals[key]
  }));


  return (

    <div
      style={{
        backgroundColor: "#1e293b",
        padding: "20px",
        borderRadius: "10px",
        marginBottom: "30px"
      }}
    >

      <h2
        style={{
          marginBottom: "20px",
          color: "white"
        }}
      >
        Emissions by Source
      </h2>


      <ResponsiveContainer
        width="100%"
        height={300}
      >

        <BarChart data={chartData}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="source" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="emissions"
            fill="#3b82f6"
          />

        </BarChart>

      </ResponsiveContainer>

    </div>
  );
}

export default AnalyticsChart;