import React from 'react';
import { Table, Typography } from 'antd';
import './App.css';

const { Text } = Typography;
const columns = [
    {
        title: 'Название',
        dataIndex: 'name',
    },
    {
        title: 'Количество',
        dataIndex: 'value',
    },
    {
        title: 'Цена',
        dataIndex: 'price',
        sorter: (a, b) => a.price - b.price,
        render: (text, record) => (<>{parseFloat(record.price).toFixed(2)} руб.</>)
    },
    {
        title: 'Сумма',
        dataIndex: 'summ',
        sorter: (a, b) => a.price - b.price,
        render: (text, record) => (
            <>{parseFloat(record.value * record.price).toFixed(2)} руб.</>
        ),
    },
    {
        title: 'Место покупки',
        dataIndex: 'location',
    },
    {
        title: 'Категория',
        dataIndex: 'category',
    },
    {
        title: 'Дата покупки',
        dataIndex: 'date',
    },
];

const demodata = [
    {
        key: '1',
        name: 'молоко',
        value: 10,
        price: 33,
        summ: '',
        location: 'Глобус',
        category: 'Продукты',
        date: '25.05.2019',
    },
    {
        key: '2',
        name: 'молоко',
        value: 10,
        price: 33,
        summ: '',
        location: 'Глобус',
        category: 'Продукты',
        date: '25.05.2019',
    },
    {
        key: '3',
        name: 'молоко',
        value: 10,
        price: 33,
        summ: '',
        location: 'Глобус',
        category: 'Продукты',
        date: '25.05.2019',
    },
    {
        key: '4',
        name: 'молоко',
        value: 10,
        price: 33,
        summ: '',
        location: 'Глобус',
        category: 'Продукты',
        date: '25.05.2019',
    },
        {
        key: '5',
        name: 'молоко',
        value: 10,
            price: 33,
            summ:'',
        location: 'Глобус',
        category: 'Продукты',
        date: '25.05.2019',
    },
];

class App extends React.Component {
    state = {
         PurchaseData: [],
        pagination: {
            current: 1,
            pageSize: 10,
        },
        loading: false,
        total: 0,
    };

    componentDidMount() {
        this.loadData();
    }
    loadData() {
        var xhr = new XMLHttpRequest();
        xhr.open("get", this.props.apiUrl + '/Purchases', true);
        xhr.onload = function () {
            var data = JSON.parse(xhr.responseText);
            var totalPrice=0;
            for (var i = 1; i < data.length; i++) {
                totalPrice += data[i].value * data[i].price;
            }
            this.setState({ PurchaseData: data, total: totalPrice });
        }.bind(this);
        xhr.send();
    }
    render() {
        return(
        <Table columns={columns}
            dataSource={this.state.PurchaseData}
            pagination={{ pageSize: 30 }}
            rowKey='pokupki_Id'
            bordered
            scroll={{ y: 500 }}
            summary={pageData => {
                var totalSumm = 0;

                pageData.forEach(({ summ }) => {
                    totalSumm += parseFloat(summ);
                });

                return (
                    <>
                        <Table.Summary.Row>
                            <Table.Summary.Cell colSpan='3'>Итого</Table.Summary.Cell>                         
                            <Table.Summary.Cell>
                                <Text>{parseFloat(this.state.total).toFixed(2)} руб.</Text>
                            </Table.Summary.Cell>
                        </Table.Summary.Row>
                    </>
                );
            }}
        />
            )
    }
}

export default App;
