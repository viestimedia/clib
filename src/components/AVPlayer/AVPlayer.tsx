import React, { useEffect, useReducer } from 'react';
import styles from './AVPlayer.module.scss';
import classNames from 'classnames';

import ReactPlayer from 'react-player';
// import screenfull from 'screenfull';

import PlayIcon from 'assets/icons/play.svg?react';
import PauseIcon from 'assets/icons/pause.svg?react';
// import FullscreenIcon from 'assets/icons/fullscreen.svg?react';
import VolumeIcon from 'assets/icons/volume1.svg?react';

type PlayerProps = Omit<React.ComponentProps<typeof ReactPlayer>, 'ref'>;

interface Props {
  className?: string;
  player: PlayerProps;
}

type PlaybackState = PlayerProps & {
  played: number;
  duration: number;
  seeking?: boolean;
};

export const AVPlayer = React.forwardRef<HTMLDivElement, Props>(
  ({ player, className = '' }, ref) => {
    const moduleExtend = styles[className] ? true : false;

    const instance = React.useRef<ReactPlayer>(null);
    const [state, setState] = useReducer(
      (state: PlaybackState, newState: Partial<PlaybackState>) => ({
        ...state,
        ...newState,
      }),
      {
        playsInline: true,
        played: 0,
        duration: 0,
        ...player,
      }
    );

    const {
      src,
      playing,
      controls,
      light,
      volume,
      muted,
      loop,
      played,
      duration,
      playbackRate,
      pip,
    } = state;

    const play = () => setState({ playing: !state.playing });

    const handlePlay = () => {
      console.debug('onPlay');
      setState({ playing: true });
    };

    const handlePause = () => {
      console.debug('onPause');
      setState({ playing: false });
    };

    const handleEnded = () => {
      console.debug('onEnded');
      setState({ playing: state.loop });
    };

    const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
      const video = e.currentTarget;
      if (!state.seeking && video.duration) {
        console.debug('onTimeUpdate', video.currentTime);
        setState({ played: video.currentTime / video.duration });
      }
    };

    const handleDurationChange = (
      e: React.SyntheticEvent<HTMLVideoElement>
    ) => {
      const dur = e.currentTarget.duration;
      console.debug('onDurationChange', dur);
      setState({ duration: dur });
    };

    const handleRateChange = (e: React.SyntheticEvent<HTMLVideoElement>) => {
      setState({ playbackRate: e.currentTarget.playbackRate });
    };

    const handleToggleMuted = () => {
      setState({ muted: !state.muted });
    };

    const handleSeekMouseDown = () => {
      setState({ seeking: true });
    };

    const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setState({ played: parseFloat(e.target.value) });
    };

    const handleSeekMouseUp = (
      e: React.MouseEvent<HTMLInputElement, MouseEvent>
    ) => {
      e.persist();

      const el = e.target as HTMLInputElement;
      setState({ seeking: false });

      if (instance.current) {
        instance.current.seekTo(parseFloat(el.value));
      }
    };

    useEffect(() => {
      console.debug('Player data', state);
    }, [state]);

    return (
      <>
        <div
          className={classNames(styles.playerContainer, {
            [styles[className]]: moduleExtend,
            [className]: !moduleExtend,
          })}
          ref={ref}
        >
          <ReactPlayer
            width="100%"
            height="100%"
            ref={instance}
            className={styles.player}
            src={src}
            pip={pip}
            playing={playing}
            controls={controls}
            light={light}
            loop={loop}
            playbackRate={playbackRate}
            volume={volume}
            muted={muted}
            playsInline={state.playsInline}
            onReady={() => console.debug('onReady')}
            onStart={() => console.debug('onStart')}
            onPlay={handlePlay}
            onPause={handlePause}
            onWaiting={() => console.debug('onWaiting')}
            onRateChange={handleRateChange}
            onSeeking={(e: unknown) => console.log('onSeeking', e)}
            onEnded={handleEnded}
            onError={(e) => console.log('onError', e)}
            onTimeUpdate={handleTimeUpdate}
            onDurationChange={handleDurationChange}
          />
          <div className={styles.controls}>
            <button onClick={play} className={styles.playpause}>
              {state.playing ? <PauseIcon /> : <PlayIcon />}
            </button>

            <Duration seconds={duration * played} />

            <div className={styles.seekerWrapper}>
              <div className={styles.seekerTotal} />

              <div
                className={styles.seekerPlayed}
                style={{ width: `${played * 100}%` }}
              />
              <input
                type="range"
                min={0}
                max={0.999999}
                step="any"
                value={played}
                onMouseDown={handleSeekMouseDown}
                onChange={handleSeekChange}
                onMouseUp={handleSeekMouseUp}
              />
            </div>
            <Duration className={styles.durationTotal} seconds={duration} />

            <label
              className={`${styles.button} ${muted ? styles.disabled : ''} ${styles.volume}`}
            >
              <input
                id="muted"
                type="checkbox"
                checked={muted ?? false}
                onChange={handleToggleMuted}
                className={styles.srOnly}
              />{' '}
              <span className={styles.srOnly}>Mute</span>
              <VolumeIcon />
            </label>
          </div>
        </div>
      </>
    );
  }
);

function Duration({
  className,
  seconds,
}: {
  className?: string;
  seconds: number;
}) {
  return (
    <time dateTime={`P${Math.round(seconds)}S`} className={className}>
      {format(seconds)}
    </time>
  );
}

function format(seconds: number) {
  const date = new Date(seconds * 1000);
  const hh = date.getUTCHours();
  const mm = date.getUTCMinutes();
  const ss = pad(date.getUTCSeconds());
  if (hh) {
    return `${hh}:${pad(mm)}:${ss}`;
  }
  return `${mm}:${ss}`;
}

function pad(string: number) {
  return ('0' + string).slice(-2);
}
