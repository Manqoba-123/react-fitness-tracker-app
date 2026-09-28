import React from 'react';
import PropTypes from 'prop-types';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

const ProgressChart = ({ type, title, data, dataKey, color }) => {
  return (
    <div style={{ display: 'block', textAlign: 'left' }}>
      <h3 style={{ color: '#ffffff', marginBottom: '1.25rem', fontSize: '1.2rem' }}>
        {title}
      </h3>
      <div style={{ width: '100%', height: 280 }}>
        <ResponsiveContainer width="100%" height="100%">
          {type === 'area' ? (
            <AreaChart data={data}>
              <defs>
                <linearGradient id={`${dataKey}Gradient`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.8}/>
                  <stop offset="95%" stopColor={color} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" />
              <XAxis dataKey="date" stroke="#a0aec0" tick={{ fontSize: 12 }} />
              <YAxis stroke="#a0aec0" tick={{ fontSize: 12 }} />
              <Tooltip contentStyle={{ backgroundColor: '#1a1821', borderColor: '#332a36', borderRadius: '8px', color: '#fff' }} />
              <Area type="monotone" dataKey={dataKey} stroke={color} fillOpacity={1} fill={`url(#${dataKey}Gradient)`} />
            </AreaChart>
          ) : (
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" />
              <XAxis dataKey="date" stroke="#a0aec0" tick={{ fontSize: 12 }} />
              <YAxis stroke="#a0aec0" tick={{ fontSize: 12 }} />
              <Tooltip contentStyle={{ backgroundColor: '#1a1821', borderColor: '#332a36', borderRadius: '8px', color: '#fff' }} />
              <Bar dataKey={dataKey} fill={color} radius={[6, 6, 0, 0]} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

ProgressChart.propTypes = {
  type: PropTypes.oneOf(['area', 'bar']).isRequired,
  title: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  dataKey: PropTypes.string.isRequired,
  color: PropTypes.string,
};

export default ProgressChart;