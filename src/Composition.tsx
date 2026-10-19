import {AbsoluteFill, Audio, Composition, Easing, Img, Sequence, interpolate, staticFile, useCurrentFrame, useVideoConfig} from "remotion";

const scenes = [
	{start: 0, title: "A calmer morning\nstarts small.", label: "30-SECOND RESET", image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1080&q=85"},
	{start: 144, title: "01  No phone\nfor 10 minutes.", label: "GIVE YOUR MIND ROOM", image: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=1080&q=85"},
	{start: 312, title: "02  Drink water\nbefore coffee.", label: "START WITH CARE", image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1080&q=85"},
	{start: 480, title: "03  Step into\nthe daylight.", label: "LET THE DAY IN", image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1080&q=85"},
	{start: 648, title: "Small rituals.\nA softer day.", label: "SAVE THIS FOR TOMORROW", image: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=1080&q=85"},
];

const Scene: React.FC<(typeof scenes)[number]> = ({image, label, title}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const enter = interpolate(frame, [0, fps * 0.65], [0, 1], {extrapolateRight: "clamp", easing: Easing.out(Easing.cubic)});
	const scale = interpolate(frame, [0, fps * 7], [1.06, 1.18], {extrapolateRight: "clamp"});
	return <AbsoluteFill style={{backgroundColor: "#19211d", overflow: "hidden"}}>
		<Img src={image} style={{height: "100%", width: "100%", objectFit: "cover", transform: `scale(${scale})`}} />
		<AbsoluteFill style={{background: "linear-gradient(180deg, rgba(11,17,13,.16) 15%, rgba(11,17,13,.28) 42%, rgba(11,17,13,.87) 100%)"}} />
		<div style={{position: "absolute", left: 76, right: 76, bottom: 160, color: "#fff", opacity: enter, transform: `translateY(${(1 - enter) * 42}px)`}}>
			<div style={{fontFamily: "Arial, sans-serif", fontWeight: 700, fontSize: 25, letterSpacing: 4, marginBottom: 25, color: "#d6e5c9"}}>{label}</div>
			<div style={{fontFamily: "Georgia, serif", fontSize: 83, lineHeight: 1.03, fontWeight: 700, whiteSpace: "pre-line", letterSpacing: -3}}>{title}</div>
		</div>
		<div style={{position: "absolute", top: 68, left: 76, color: "#fff", fontFamily: "Arial, sans-serif", fontWeight: 700, letterSpacing: 3, fontSize: 22}}>MORNING NOTES</div>
	</AbsoluteFill>;
};

export const CalmMorning: React.FC = () => <AbsoluteFill>
	<Audio src={staticFile("audio/calm-morning.mp3")} />
	{scenes.map((scene, index) => <Sequence key={scene.start} from={scene.start} durationInFrames={index === scenes.length - 1 ? 72 : 168}><Scene {...scene} /></Sequence>)}
</AbsoluteFill>;

export const MyComposition: React.FC = () => <Composition id="CalmMorning" component={CalmMorning} durationInFrames={720} fps={24} width={1080} height={1920} />;
