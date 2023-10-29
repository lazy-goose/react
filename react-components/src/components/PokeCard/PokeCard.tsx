import { Component } from 'react';
import s from './PokeCard.module.scss';
import jcn from '../../utils/joinClassNames';

type PokeCardProps = {
  name: string;
  types: string[];
  imageUrl: string;
  imageAlt?: string;
  className?: string;
};

export default class PokeCard extends Component<PokeCardProps> {
  render() {
    return (
      <div className={jcn(s.PokeCard, this.props.className)}>
        <div className={s.ImageContainer}>
          {this.props.imageUrl ? (
            <img
              className={s.Image}
              src={this.props.imageUrl}
              alt={this.props.imageAlt || `${this.props.name} pokemon`}
            />
          ) : (
            <div className={s.ImageFallbackBlock}>?</div>
          )}
        </div>
        <h3 className={s.Name}>{this.props.name}</h3>
        <p className={s.Types}>Types: {this.props.types.join(', ')}</p>
      </div>
    );
  }
}
