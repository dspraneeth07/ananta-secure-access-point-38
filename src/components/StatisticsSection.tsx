
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, LabelList } from 'recharts';
import { mockCriminals, telanganaDistricts } from '@/data/mockCriminals';

// Mock data with 60% arrested and 40% absconding
const totalCriminals = mockCriminals.length;
const arrestedCount = Math.round(totalCriminals * 0.6);
const abscondingCount = Math.round(totalCriminals * 0.4);

const accusedStatusData = [
  { status: 'Arrested', count: arrestedCount, fill: '#22c55e' },
  { status: 'Absconding', count: abscondingCount, fill: '#ef4444' },
];

// Calculate domicile data from mock criminals
const telanganaCount = mockCriminals.filter(c => c.state === 'Telangana').length;
const otherStatesCount = mockCriminals.filter(c => c.country === 'India' && c.state !== 'Telangana').length;
const internationalCount = mockCriminals.filter(c => c.country !== 'India').length;

const domicileData = [
  { state: 'Telangana', count: telanganaCount },
  { state: 'Other Indian States', count: otherStatesCount },
  { state: 'Foreigners', count: internationalCount },
];

// Calculate case status data from mock criminals with proper colors
const caseStatusCounts = mockCriminals.reduce((acc, criminal) => {
  acc[criminal.caseStatus] = (acc[criminal.caseStatus] || 0) + 1;
  return acc;
}, {} as Record<string, number>);

const caseStatusColors = ['#3b82f6', '#f59e0b', '#10b981', '#8b5cf6', '#f97316', '#06b6d4', '#84cc16', '#6b7280'];

const caseStatusData = Object.entries(caseStatusCounts).map(([status, count], index) => ({
  status,
  count,
  fill: caseStatusColors[index % caseStatusColors.length]
}));

// Calculate district-wise data for Telangana districts
const districtData = telanganaDistricts.map(district => ({
  district,
  cases: mockCriminals.filter(c => c.district === district).length
})).filter(d => d.cases > 0);

const chartConfig = {
  count: {
    label: "Count",
    color: "hsl(var(--chart-1))",
  },
  cases: {
    label: "Cases",
    color: "hsl(var(--chart-2))",
  },
};

const StatisticsSection = () => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Accused Status Report */}
        <Card className="h-[280px]">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">Accused Status Report</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={accusedStatusData}
                    cx="50%"
                    cy="50%"
                    outerRadius={60}
                    dataKey="count"
                    label={({ status, count }) => `${status}: ${count}`}
                  >
                    {accusedStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Accused Domicile Status Report */}
        <Card className="h-[280px]">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">Accused Domicile Status (Location-wise)</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={domicileData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="state" fontSize={10} />
                  <YAxis fontSize={10} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="count" fill="#3b82f6">
                    <LabelList dataKey="count" position="top" fontSize={12} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Bottom row - Side by side charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Case Status Distribution */}
        <Card className="h-[320px]">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">State-wise Case Status Details</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={caseStatusData} margin={{ top: 20, right: 15, left: 10, bottom: 40 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="status" 
                    angle={-45}
                    textAnchor="end"
                    height={60}
                    interval={0}
                    fontSize={9}
                  />
                  <YAxis fontSize={10} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="count" radius={[2, 2, 0, 0]}>
                    <LabelList dataKey="count" position="top" fontSize={10} />
                    {caseStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* District-wise Cases */}
        <Card className="h-[320px]">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">District-wise Reported Cases (Telangana)</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={districtData} margin={{ top: 20, right: 15, left: 10, bottom: 40 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="district" 
                    angle={-45}
                    textAnchor="end"
                    height={60}
                    interval={0}
                    fontSize={9}
                  />
                  <YAxis fontSize={10} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="cases" fill="#f59e0b">
                    <LabelList dataKey="cases" position="top" fontSize={10} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StatisticsSection;
