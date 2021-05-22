import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './index.css'

function run(canvas: HTMLCanvasElement) {
    return
}

const Game = () => {

}

const Demo = () => {
    const names = [
        ["A", "B", "C"],
        ['hoge', 'piyo', 'hogehoge',],
        ['piyo', 'fuga', 'hogefuga',],
    ]
    return <table className="table table-striped">
        <thead>
            <tr>
                {names[0].map((x, j) => <th key={j}>{x}</th>)}
            </tr>
        </thead>
        <tbody>
            {names.slice(1).map((row, i) =>
                <tr key={i}>
                    {row.map((x, j) => <td key={j}>{x}</td>)}
                </tr>
            )}
        </tbody>
        <TextAnimation />
    </table>
}

class Canvas extends React.Component<{ angle: number, text: string }> {
    canvasRef: any
    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
    }

    componentDidUpdate() {
        // Draws a square in the middle of the canvas rotated
        // around the centre by this.props.angle
        const { angle } = this.props;
        const canvas = this.canvasRef.current;
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
        const width = canvas.width;
        const height = canvas.height;
        ctx.save();
        ctx.beginPath();
        ctx.clearRect(0, 0, width, height);
        ctx.translate(width / 2, height / 2);
        ctx.rotate((angle * Math.PI) / 180);
        ctx.fillStyle = '#4397AC';
        ctx.fillRect(-width / 4, -height / 4, width / 2, height / 2);
        ctx.fillStyle = '#333';
        ctx.fillText(this.props.text, 0, 0);
        ctx.restore();
    }

    render() {
        return <canvas width="300" height="300" ref={this.canvasRef} />;
    }
}

class Animation extends React.Component<{ text: string }, { angle: number }> {
    rAF: any

    constructor(props: any) {
        super(props);
        this.state = { angle: 0 };
        this.updateAnimationState = this.updateAnimationState.bind(this);
    }

    componentDidMount() {
        this.rAF = requestAnimationFrame(this.updateAnimationState);
    }

    updateAnimationState() {
        this.setState(prevState => ({ angle: prevState.angle + 1 }));
        this.rAF = requestAnimationFrame(this.updateAnimationState);
    }

    componentWillUnmount() {
        cancelAnimationFrame(this.rAF);
    }

    render() {
        return <Canvas angle={this.state.angle} text={this.props.text} />;
    }
}

const TextAnimation = () => {
    const [text, setText] = useState("Hello")

    return <>
        <input onChange={(e) => {
            setText(e.target.value)
        }} value={text} />
        <Animation text={text}></Animation>
    </>
}

ReactDOM.render(
    <>
        <Demo />
    </>,
    document.getElementById('app'),
)

var sun = new Image();
var moon = new Image();
var earth = new Image();
function init() {
    sun.src = 'https://mdn.mozillademos.org/files/1456/Canvas_sun.png';
    moon.src = 'https://mdn.mozillademos.org/files/1443/Canvas_moon.png';
    earth.src = 'https://mdn.mozillademos.org/files/1429/Canvas_earth.png';
    window.requestAnimationFrame(draw);
}

function draw() {
    const canvas = document.getElementById("canvas")! as HTMLCanvasElement;
    var ctx = canvas.getContext('2d')!;

    ctx.globalCompositeOperation = 'destination-over';
    ctx.clearRect(0, 0, 300, 300); // clear canvas

    ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
    ctx.strokeStyle = 'rgba(0, 153, 255, 0.4)';
    ctx.save();
    ctx.translate(150, 150);

    // Earth
    var time = new Date();
    ctx.rotate(((2 * Math.PI) / 60) * time.getSeconds() + ((2 * Math.PI) / 60000) * time.getMilliseconds());
    ctx.translate(105, 0);
    ctx.fillRect(0, -12, 40, 24); // Shadow
    ctx.drawImage(earth, -12, -12);

    // Moon
    ctx.save();
    ctx.rotate(((2 * Math.PI) / 6) * time.getSeconds() + ((2 * Math.PI) / 6000) * time.getMilliseconds());
    ctx.translate(0, 28.5);
    ctx.drawImage(moon, -3.5, -3.5);
    ctx.restore();

    ctx.restore();

    ctx.beginPath();
    ctx.arc(150, 150, 105, 0, Math.PI * 2, false); // Earth orbit
    ctx.stroke();

    ctx.drawImage(sun, 0, 0, 300, 300);

    window.requestAnimationFrame(draw);
}

// init();