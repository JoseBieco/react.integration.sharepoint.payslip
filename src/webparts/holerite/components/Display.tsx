import * as React from 'react';
import { Game } from './HoleriteProps';

interface DisplayProps {
    game: Game;
}

const Display: React.FC<DisplayProps> = (props) => {
    return(
        <div style={{padding: 10}}>
            <span style={{padding: 3}}>{props.game.version.name}</span>
            <span style={{fontWeight: 'bold'}}>{props.game.game_index}</span>
        </div>
    );
}

export default Display;