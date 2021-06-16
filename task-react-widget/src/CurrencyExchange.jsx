import React from 'react'
import CurrencyForm from './CurrencyForm';

class CurrencyExchange extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            options: [],
            base: 'EUR',
            amount: 0,
            convertTo: 'USD',
            result: 0,
            date: '',
            data: {},
            isOnFocusBase: true,
        }
    }

    getFetchData() {
        fetch("http://api.exchangeratesapi.io/v1/latest?access_key=ffedd88fb173fdcc02bc89ad0636de55")
      .then(res => res.json())
      .then(data => {
          this.setState({
          options: Object.keys(data.rates),
          date: data.date,
          data: data.rates,
      })}
      )
    }

    calculate = () => {
        const amount = this.state.amount
        const result = this.state.result
        console.log(this.state.amount, this.state.base, this.state.convertTo, this.state.result)
        if(isNaN(amount) || isNaN(result)) {
            return
        } else if(this.state.isOnFocusBase) {
            const result = (this.state.data[this.state.convertTo] * this.state.amount / this.state.data[this.state.base]).toFixed(3)
            this.setState({ result })
        } else {
            const amount = (this.state.data[this.state.base] * this.state.result / this.state.data[this.state.convertTo]).toFixed(3)
            console.log(amount)
            this.setState({ amount })
        }
    }

    componentDidMount() {
        this.getFetchData()
    }

    onChange = (e) => {
        this.setState({base: e.target.value}, this.calculate)
    }

    render() {
        const {options, base, amount, convertTo, result, date} = this.state
        return (
            <div>
                <h1>Currency Exchange</h1>
                <h4>{amount} {base} equals</h4>
                <h2>{result} {convertTo}</h2>
                <p>{date}</p>
                <CurrencyForm 
                options = {options}
                selectValue = {base}
                inputValue = {amount}
                onChangeSelect = {e => this.setState({base: e.target.value, isOnFocusBase: true}, this.calculate)}
                onChangeInput = {e => this.setState({amount: e.target.value, isOnFocusBase: true}, this.calculate)}/>
                <CurrencyForm 
                options = {options}
                selectValue = {convertTo}
                inputValue = {result}
                onChangeSelect = {e => this.setState({convertTo:e.target.value, isOnFocusBase: false}, this.calculate)}
                onChangeInput = {e => this.setState({result: e.target.value, isOnFocusBase: false}, this.calculate)}/>
            </div>
        )
    }
}

export default CurrencyExchange