import * as React from 'react';
import axios from 'axios';
import styles from './Holerite.module.scss';
import { HoleriteProps, HoleriteInitialProps, HoleriteState, Game, HOLERITE_INITIAL_STATE } from './HoleriteProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { HoleriteWebPartProps } from '../HoleriteWebPart';
import Display from './Display';
import Modal from './Modal';

export default class Holerite extends React.Component<HoleriteWebPartProps, HoleriteState> {

  public constructor(props: HoleriteWebPartProps,state: HoleriteState){
    super(props);
    this.state = HOLERITE_INITIAL_STATE;
    this.setState(HOLERITE_INITIAL_STATE);
  }

  public async componentDidMount() {
    try{
      this.setState({games_in: []});
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/pikachu`)
      let newHolerite: HoleriteProps = HoleriteInitialProps;
      
      newHolerite.name = response.data.name;
      newHolerite.weight = response.data.weight;
      newHolerite.order = response.data.order;
      newHolerite.img = response.data.sprites.front_shiny ? response.data.sprites.front_shiny : response.data.sprites.front_default;
      
      if(!this.state.games_in.length){
        response.data.game_indices.map((game: Game) => {
          newHolerite.games_in.push(game);
        });
      }
      
      this.setState(newHolerite);
    }catch(error){
      console.log(error);
    }
  }

  public render(): React.ReactElement<HoleriteProps> {
    return (
      <div className={ styles.holerite }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>Welcome to SharePoint!</span>
              <p className={ styles.subTitle }>Customize SharePoint experiences using Web Parts.</p>
              <a className={ styles.button }>
                <span className={ styles.label }>Learn more</span>
              </a>
            </div>
            <div>
              <p>{`Name: ${this.state.name}`}</p>
              <p>{`Weigth: ${this.state.weight}`}</p>
              <p>{`Oredr: ${this.state.order}`}</p>
              <img src={this.state.img} />
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between'}}>
          {
            this.state.games_in.map(game => (
             <Display game={game} />
            ))
          }
          </div>
          <button onClick={() => {this.setState({isOpen: !this.state.isOpen})}}>OPEN</button>
          {this.state.isOpen &&
            <Modal isOpen={this.state.isOpen}/>
          }
      </div>
    );
  }
}

// <p className={ styles.description }>{escape(this.props.description)}</p>
//https://pokeapi.co/api/v2/pokemon/nome_pokemon

/* const Holerite: React.FC<HoleriteWebPartProps> = ({description}, HoleriteWebPartProps) => {
  return(
    <div>{description}</div>
  )
} 
  export default Holerite;
*/
