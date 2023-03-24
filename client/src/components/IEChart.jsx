import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEquipments } from "state/actions/equipmentActions";
import { getMembers } from "state/actions/memberActions";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Label,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function IEChart() {
  const dispatch = useDispatch();

  const listEquipments = useSelector((state) => state.equipments);
  const { equipmentsInfo } = listEquipments;

  const listMembers = useSelector((state) => state.members);
  const { membersInfo } = listMembers;

  useEffect(() => {
    dispatch(getMembers());
    dispatch(getEquipments());
  }, [dispatch]);

  const expenses = equipmentsInfo
    ?.map((equipment) => equipment.price)
    .reduce((acc, val) => acc + val, 0);
  const income = membersInfo
    ?.map((member) => member.payment.reduce((acc, val) => acc + val.amount, 0))
    .reduce((acc, val) => acc + val, 0);

  const data = [
    {
      name: "Income & Expenses",
      Income: income,
      Expenses: expenses,
    },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <XAxis dataKey="name" />
        <YAxis>
          <Label value="Amount in Rupees" angle={-90} position="insideLeft" />
        </YAxis>
        <Tooltip />
        <Legend />
        <Bar dataKey="Income" fill="#8884d8" />
        <Bar dataKey="Expenses" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
}
