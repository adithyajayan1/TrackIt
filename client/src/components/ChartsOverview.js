import React from 'react';
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
    PieChart, Pie, Cell, LineChart, Line
} from 'recharts';
import moment from 'moment';

const aggregateDataForCharts = (transactions, type) => {
    const dailyData = transactions.reduce((acc, curr) => {
        const date = moment(curr.date).format('YYYY-MM-DD');
        acc[date] = (acc[date] || 0) + curr.amount;
        return acc;
    }, {});

    const sortedData = Object.keys(dailyData).map(date => ({
        date,
        [type]: dailyData[date]
    })).sort((a, b) => new Date(a.date) - new Date(b.date));

    return sortedData;
};

const aggregateByCategory = (transactions) => {
    const categoryData = transactions.reduce((acc, curr) => {
        acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
        return acc;
    }, {});

    return Object.keys(categoryData).map(category => ({
        name: category,
        value: categoryData[category]
    }));
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF19A0']; // Chart colors

function ChartsOverview({ incomes, expenses }) {
    const incomeDaily = aggregateDataForCharts(incomes, 'income');
    const expenseDaily = aggregateDataForCharts(expenses, 'expense');
    const incomeByCategory = aggregateByCategory(incomes);
    const expenseByCategory = aggregateByCategory(expenses);

    const allDailyDates = [...new Set([...incomeDaily.map(d => d.date), ...expenseDaily.map(d => d.date)])].sort();
    const combinedDailyData = allDailyDates.map(date => {
        const income = incomeDaily.find(d => d.date === date)?.income || 0;
        const expense = expenseDaily.find(d => d.date === date)?.expense || 0;
        return { date, Income: income, Expense: expense };
    });


    return (
        <div className="grid grid-cols-1 gap-6">
            <div className="bg-secondary-dark p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold text-text-light mb-4">Income vs Expense Trend</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={combinedDailyData}>
                        <XAxis dataKey="date" stroke="#A0AEC0" />
                        <YAxis stroke="#A0AEC0" />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#2D3748', border: 'none', borderRadius: '8px' }}
                            itemStyle={{ color: '#E2E8F0' }}
                        />
                        <Legend wrapperStyle={{ color: '#E2E8F0' }} />
                        <Line type="monotone" dataKey="Income" stroke="#48BB78" strokeWidth={2} activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="Expense" stroke="#F56565" strokeWidth={2} activeDot={{ r: 8 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div className="bg-secondary-dark p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold text-text-light mb-4">Expenses by Category</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={expenseByCategory}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                        >
                            {expenseByCategory.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{ backgroundColor: '#2D3748', border: 'none', borderRadius: '8px' }}
                            itemStyle={{ color: '#E2E8F0' }}
                        />
                        <Legend wrapperStyle={{ color: '#E2E8F0' }} />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            <div className="bg-secondary-dark p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold text-text-light mb-4">Income by Category</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={incomeByCategory}>
                        <XAxis dataKey="name" stroke="#A0AEC0" />
                        <YAxis stroke="#A0AEC0" />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#2D3748', border: 'none', borderRadius: '8px' }}
                            itemStyle={{ color: '#E2E8F0' }}
                        />
                        <Legend wrapperStyle={{ color: '#E2E8F0' }} />
                        <Bar dataKey="value" fill="#48BB78" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default ChartsOverview;