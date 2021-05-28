import format from 'date-fns/format'
import ptBR from 'date-fns/locale/pt-BR'

import dynamic from 'next/dynamic'

import styles from './styles.module.scss';

export function Header() {
    const currentDate = format(new Date(), 'EEEEEE, d MMM',{
        locale: ptBR,
    });

    const ToggleButton = dynamic(() =>
	    import ('../ToggleButton').then((mod) => mod.ToggleButton)
    )

    return (
        <header className={styles.headerContainer}>
            <img src="/logo.svg" alt="Podcastr" />

            <p>O melhor para você ouvir!</p>

            <span>{currentDate}</span>

            <ToggleButton />
        </header>
    )
}