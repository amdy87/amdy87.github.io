import React from 'react';
import './SortingVisualizer.css';
import { mergeSort } from '../sortingAlgos/sortingAlgorithms';

export default class SortingVisualizer extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            array: [],
        };
    }

    componentDidMount(){
        this.resetArray();
    }

    resetArray(){
        const array = [];
        for (let i = 0; i < 330; i ++){
            array.push(randomIntFromInterval(5, 730));
        }
        this.setState({array});
    }

    mergeSort(){
        const animations = mergeSort(this.state.array);
        const newAnimaitons = [];
        const speed = 5;

        for (const animation of animations) {
            newAnimaitons.push(animation.comparison);
            newAnimaitons.push(animation.comparison);
            newAnimaitons.push(animation.swap);
        }
        for (let i = 0; i < newAnimaitons.length; i ++){
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = i % 3 !== 2;
            if(isColorChange){
                const [barOneIdx, barTwoIdx] = newAnimaitons[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 3 === 0 ? 'red' : 'turquoise';
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * speed);
            } else {
                setTimeout(() => {
                    const [barOneIdx, newHeight] = newAnimaitons[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                }, i * speed);
            }
        }
    }

    render() {
        const {array} = this.state;

        return (
            <div className='array-container'>
                {array.map((value,idx) => (
                    <div className='array-bar' key={idx}
                    style={{height: `${value}px`}}></div>
                ))}
                <button onClick={() => this.resetArray()}>Generate New Array</button>
                <button onClick={() => this.mergeSort()}>Merge Sort</button>

            </div>
        );
        }
    }

function randomIntFromInterval(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function arraysAreEqual(arrayOne, arrayTwo) {
    if (arrayOne.length !== arrayTwo.length) return false;
    for(let i = 0; i < arrayOne.length; i ++){
        if (arrayOne[i] !== arrayTwo[i]) {
            console.log(arrayOne[i], arrayTwo[i]);
            return false;
        }
    }
    return true;
}