import React, { Component } from 'react';
import axios from 'axios';

class Fib extends Component {
    state = {
        seenIndices: [],
        values: {},
        index: ''
    };

    componentDidMount() {
        this.fetchValues();
        this.fetchIndices();
    }

    async fetchValues() {
        const values = await axios.get('/api/values/current');
        this.setState({ values: values.data });
    }

    async fetchIndices() {
        const seenIndices = await axios.get('/api/values/all');
        this.setState({ seenIndices: seenIndices.data });
    }

    onInputChange(event) {
        this.setState({ index: event.target.value });
    }

    handleSubmit = async (event) => {
        event.preventDefault();

        await axios.post('/api/values', {
            index: this.state.index
        });

        this.setState({ index: '' });
    }

    renderSeenIndices() {
        return this.state.seenIndices.map((obj) => obj.number).join(', ');
    }

    renderValues() {
        const entries = [];

        for (let key in this.state.values) {
            entries.push(
                <div key={key}>For index {key} I calculated {this.state.values[{key}]}</div>
            )
        }

        return entries;
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>Enter the index:</label>
                    <input
                    value={this.state.index}
                    onChange={this.onInputChange()}
                    ></input>
                    <button>Submit</button>
                </form>

                <h3>Indices I have seen:</h3>
                {this.renderSeenIndices()}

                <h3>Log of Calculated values:</h3>
                {this.renderValues()}
            </div>
        );
    }
}

export default Fib;