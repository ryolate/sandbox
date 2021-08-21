import React, { useState, useEffect } from 'react'

export const App = () => {
	const [play, setPlay] = useState(false)
	const player = new Player()
	// Game sound
	useEffect(() => {
		if (!play) {
			return
		}

		// TODO: use AudioWorklet
		const ctx = new AudioContext()
		const sampleRate = ctx.sampleRate // e.g. 44100
		const scriptNode: ScriptProcessorNode = ctx.createScriptProcessor(4096, 0, 1)
		scriptNode.onaudioprocess = (e: AudioProcessingEvent) => {
			const outputBuffer = e.outputBuffer.getChannelData(0)
			player.processAudio(outputBuffer, ctx.currentTime, e.playbackTime, sampleRate)
		}
		const filter = new BiquadFilterNode(ctx, {
			type: "lowpass",
		})
		scriptNode.connect(filter).connect(ctx.destination)

		return () => {
			scriptNode.disconnect(filter)
			scriptNode.onaudioprocess = null
			ctx.close()
		}
	}, [play])

	return <div>
		<button onClick={() => {
			setPlay(!play)
		}}>{play ? "Stop sound" : "Play sound"}</button>
	</div>
}

class Player {
	tones = [261, 293, 329, 349, 391, 440, 493, 523]
	index = 0
	prevTimeSecond = -1
	toneIndex = -1
	// Output audio data
	//
	// currentTime: BaseAudioContext.currentTime
	// timestamp: The time when the audio will be played, as defined by the time
	//     of AudioContext.currentTime.
	// sampleRate: sampling rate of the audio.
	processAudio(outputBuffer: Float32Array, currentTime: number, timeStamp: number, sampleRate: number): void {
		for (let i = 0; i < outputBuffer.length; i++) {
			const time = timeStamp + i / sampleRate
			const currentTimeSecond = Math.floor(time * 1)
			if (this.prevTimeSecond != currentTimeSecond) {
				this.prevTimeSecond = currentTimeSecond
				this.toneIndex++
				if (this.toneIndex >= this.tones.length) {
					this.toneIndex -= this.tones.length
				}
			}
			if (this.toneIndex < 0) {
				return
			}
			const tone = this.tones[this.toneIndex]
			const y = Math.sin(2 * tone * 1 * Math.PI * this.index / sampleRate)
			outputBuffer[i] = y * 0.2 // volume
			this.index++
		}
	}
}
