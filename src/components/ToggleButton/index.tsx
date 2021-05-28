import { useEffect, useState } from 'react'
import { useTrail, animated, to, useSpring } from 'react-spring'

import styles from './styles.module.scss'

export function ToggleButton() {
    const [onTheme, setOnTheme] = useState(document.body.dataset.theme);
    const offTheme = onTheme === 'light' ? 'dark' : 'light';

    const [dark, setDark] = useState(document.body.dataset.theme === 'dark')
    const [clicked, setClicked] = useState(false)

    useEffect(() => {
        document.body.dataset.theme = onTheme;
        window.localStorage.setItem("theme", onTheme);
      }, [onTheme]);

    const circles = [
        { cx: "17", cy: "9" },
        { cx: "13", cy: "16" },
        { cx: "5", cy: "16" },
        { cx: "1", cy: "9" },
        { cx: "5", cy: "2" },
        { cx: "13", cy: "2" }
    ];

    const trail = useTrail(circles.length, {
        sc: dark ? "0" : "1",
        from: {
            sc: clicked ? "0" : "1"
        },
        config: {
            mass: 2,
            tension: 215,
            friction: 20,
        }
    });

    const props = useSpring({
        transform: dark ? "rotate(40deg)" : "rotate(90deg)",
        config: {
            mass: dark ? 3 : 1,
            tension: 200,
            friction: 15,
        }
    })

    return (
        <button
            type='button'
            title={`Ativar ${offTheme} mode`}
            className={styles.toggleButton}
            onClick={() => {
                setOnTheme(offTheme)
                setDark(!dark)
                setClicked(true)
            }}
        >
            <animated.svg
                width="18" 
                height="18" 
                viewBox="0 0 18 18" 
                style={clicked? props : {transform: "rotate(40deg)"}}
            >
                <mask id="moon-mask">
                    <rect width="18" height="18" fill="white"></rect>
                    <circle cx={dark ? "10" : "25"} cy={dark ? "2" : "0"} r="8" fill="black"></circle>
                </mask>
                <circle
                    cx="9"
                    cy="9"
                    r={dark ? "8" : "5"}
                    fill="var(--text-secondary)"
                    mask="url(#moon-mask)"
                >
                </circle>
                <g>
                    {trail.map(({ sc }, index) => {
                        return (
                            <animated.circle
                                key={index}
                                cx={circles[index].cx}
                                cy={circles[index].cy}
                                r="1.5"
                                fill="var(--text-secondary)"
                                style={
                                    dark
                                        ? { display: "none" }
                                        : { transformOrigin: "center", transform: to([sc], (sc) => `scale(${sc})`), }
                                }
                            ></animated.circle>
                        );
                    })}
                </g>
            </animated.svg>
        </button>
    )
}