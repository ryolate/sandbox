import React, { useState, useEffect, useRef } from 'react'

export const Demo = () => {
    const names = [
        ["A", "B", "C"],
        ['hoge', 'piyo', 'hogehoge',],
        ['piyo', 'fuga', 'hogefuga',],
    ]
    return <>
        <table className="table table-striped">
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
        </table>
        <TextAnimation />
        <Circle />
    </>
}

type CanvasProp = {
    angle: number
    text: string
}
class Canvas extends React.Component<CanvasProp> {
    canvasRef: any
    constructor(props: CanvasProp) {
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
    const [text, setText] = useState("Hoge")

    return <>
        <input onChange={(e) => {
            setText(e.target.value)
        }} value={text} />
        <Animation text={text}></Animation>
    </>
}

const Circle = () => {
    const ref = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = ref.current!;
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

        let reqId: number;
        let i = 0;
        const render = () => {
            const [w, h] = [canvas.width, canvas.height]
            ctx.clearRect(0, 0, w, h)
            ctx.fillStyle = '#333'
            ctx.beginPath();
            ctx.arc(
                w / 2,
                h / 2,
                w / 2 * Math.abs(Math.cos(i)),
                0,
                2 * Math.PI
            )
            ctx.fill()
            i += 0.05
            reqId = requestAnimationFrame(render);
        }
        render()
        return () => {
            cancelAnimationFrame(reqId)
        }
    })

    return <>
        <canvas
            height="150" width="150"
            style={{ backgroundColor: "#ccc" }}
            ref={ref}
        />
    </>
}