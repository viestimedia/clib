import React, { useEffect, useReducer } from 'react';
import styles from './AVPlayer.module.scss';
import classNames from 'classnames';

import ReactPlayer, { FilePlayerProps } from 'react-player/file';
// import screenfull from 'screenfull';
import { OnProgressProps } from 'react-player/base';

import PlayIcon from 'assets/icons/play.svg';
import PauseIcon from 'assets/icons/pause.svg';
import FullscreenIcon from 'assets/icons/fullscreen.svg';
import VolumeIcon from 'assets/icons/volume1.svg';

interface Props {
  className?: string;
  // player: React.ComponentProps<typeof ReactPlayer>;
  player: FilePlayerProps;
}

/**
 * This player works with files that are supported by the browser.
 * This *does* support playing HLS, but we have a separate implementation for that. ReactPlayer will load hls.js from a public CDN if you pass it an HLS stream.
 *
 * @todo Consider contributing to ReactPlayer to use hls.js from peer dependencies, instead of loading it from a CDN we don't control.
 * That would allow us to remove our "custom" HLS player, which just uses
 * the native unstyled <video> element.
 */
export const AVPlayer = React.forwardRef<HTMLDivElement, Props>(
  ({ player, className = '' }, ref) => {
    const moduleExtend = styles[className] ? true : false;

    const instance = React.useRef<ReactPlayer>(null);
    const [state, setState] = useReducer(
      (state: FilePlayerProps, newState: Partial<FilePlayerProps>) => ({
        ...state,
        ...newState,
      }),
      {
        ...player,
      }
    );

    const {
      url,
      playing,
      controls,
      light,
      volume,
      muted,
      loop,
      played,
      // loaded,
      duration,
      playbackRate,
      pip,
    } = state;

    const play = () => setState({ playing: !state.playing });

    // const load = (url: string) => {
    //   setState({
    //     url,
    //     played: 0,
    //     loaded: 0,
    //     pip: false,
    //   });
    // };

    // const handleStop = () => {
    //   setState({ url: undefined, playing: false });
    // };

    // const handleToggleControls = () => {
    //   // const url = state.url;
    //   setState(
    //     {
    //       controls: !state.controls,
    //       // url: undefined,
    //     }
    //     // () => load(url)
    //   );
    // };

    // const handleToggleLight = () => {
    //   setState({ light: !state.light });
    // };

    // const handleToggleLoop = () => {
    //   setState({ loop: !state.loop });
    // };

    // const handleVolumeChange = (e) => {
    //   setState({ volume: parseFloat(e.target.value) });
    // };

    const handleToggleMuted = () => {
      setState({ muted: !state.muted });
    };

    // const handleSetPlaybackRate = (e) => {
    //   setState({ playbackRate: parseFloat(e.target.value) });
    // };

    const handleOnPlaybackRateChange = (speed: string) => {
      setState({ playbackRate: parseFloat(speed) });
    };

    // const handleTogglePIP = () => {
    //   setState({ pip: !state.pip });
    // };

    const handlePlay = () => {
      console.log('onPlay');
      setState({ playing: true });
    };

    const handleEnablePIP = () => {
      console.log('onEnablePIP');
      setState({ pip: true });
    };

    const handleDisablePIP = () => {
      console.log('onDisablePIP');
      setState({ pip: false });
    };

    const handlePause = () => {
      console.log('onPause');
      setState({ playing: false });
    };

    const handleProgress = (progress: OnProgressProps) => {
      console.log('onProgress', progress);
      // We only want to update time slider if we are not currently seeking
      if (!state.seeking) {
        setState(progress);
      }
    };

    const handleEnded = () => {
      console.log('onEnded');
      setState({ playing: state.loop });
    };

    const handleDuration = (duration: number) => {
      console.log('onDuration', duration);
      setState({ duration });
    };

    // const handleClickFullscreen = () => {
    //   // screenfull.request()
    // };

    const handleSeekMouseDown = () =>
      // e: React.MouseEvent<HTMLInputElement, MouseEvent>
      {
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

      // instance.current.seekTo(parseFloat(e.target.value))
      instance.current?.seekTo(parseFloat(el.value));
    };

    useEffect(() => {
      console.log('Player data', state);
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
            // className="not-working"
            url={url}
            pip={pip}
            playing={playing}
            controls={controls}
            light={light}
            loop={loop}
            playbackRate={playbackRate}
            volume={volume}
            muted={muted}
            onReady={() => console.log('onReady')}
            onStart={() => console.log('onStart')}
            onPlay={handlePlay}
            onEnablePIP={handleEnablePIP}
            onDisablePIP={handleDisablePIP}
            onPause={handlePause}
            onBuffer={() => console.log('onBuffer')}
            onPlaybackRateChange={handleOnPlaybackRateChange}
            onSeek={(e) => console.log('onSeek', e)}
            onEnded={handleEnded}
            onError={(e) => console.log('onError', e)}
            onProgress={handleProgress}
            onDuration={handleDuration}
            {...state}
          />

          <div
            className={`flex justify-between items-center ${styles.controls}`}
          >
            <button onClick={play} className={styles.playpause}>
              {state.playing ? <PauseIcon /> : <PlayIcon />}
            </button>

            <Duration className={styles.duration} seconds={duration * played} />

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
            <Duration className={styles.duration} seconds={duration} />

            <label
              className={`${styles.button} ${muted ? styles.disabled : ''}`}
            >
              <input
                id="muted"
                type="checkbox"
                checked={muted}
                onChange={handleToggleMuted}
                className="sr-only"
              />{' '}
              <span className="sr-only">Mute</span>
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
