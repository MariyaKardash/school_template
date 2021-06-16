import React from 'react'

class CurrencyForm extends React.Component {
    render() {
        return (
        <form>
            <input type="number" value={this.props.inputValue} onChange={this.props.onChangeInput}/>
            <select onChange={this.props.onChangeSelect} value={this.props.selectValue}>
                {this.props.options.map(option => {
                    return <option value={option} key={option}>{option}</option>
                })}
            </select>
        </form>
    )
}
}

export default CurrencyForm
