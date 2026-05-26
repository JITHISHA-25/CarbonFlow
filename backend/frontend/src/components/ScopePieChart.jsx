import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";


function ScopePieChart({ records }) {

  const scopeTotals = {};

  records.forEach((r) => {

    if (!scopeTotals[r.scope]) {
      scopeTotals[r.scope] = 0;
    }

    scopeTotals[r.scope] +=
      Number(r.emissions_kg_co2e);
  });


  const chartData = Object.keys(scopeTotals).map((key) => ({
    scope: key,
    emissions: scopeTotals[key]
  }));


  const COLORS = [
    "#3b82f6",
    "#22c55e",
    "#f59e0b"
  ];


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
        Scope Distribution
      </h2>


      <ResponsiveContainer
        width="100%"
        height={350}
      >

        <PieChart>

          <Pie
            data={chartData}
            dataKey="emissions"
            nameKey="scope"
            outerRadius={120}
            label
          >

            {chartData.map((entry, index) => (

              <Cell
                key={`cell-${index}`}
                fill={
                  COLORS[
                    index % COLORS.length
                  ]
                }
              />

            ))}

          </Pie>

          <Tooltip />

          <Legend />

        </PieChart>

      </ResponsiveContainer>

    </div>
  );
}

export default ScopePieChart;