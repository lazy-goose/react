import Link from 'next/link';
import Image from 'next/image';
import s from './PokeCard.module.scss';
import jcn from '../../utils/joinClassNames';

type PokeCardProps = {
  name: string;
  types: string[];
  imageUrl: string;
  imageAlt?: string;
  className?: string;
  active?: boolean;
};

export default function PokeCard(props: PokeCardProps) {
  const { name, types, imageUrl, imageAlt, className, active } = props;

  return (
    <div
      className={jcn(s.PokeCard, active ? s.Active : null, className)}
      data-testid="pokemon-card"
    >
      <Link
        href={`/pokemon/${name}`}
        scroll={false}
        className={s.LinkWrapper}
        data-testid="pokemon-card-link"
      >
        <div className={s.ImageContainer}>
          {imageUrl ? (
            <Image
              width={96 * 2}
              height={96 * 2}
              className={s.Image}
              src={imageUrl}
              alt={imageAlt || `${name} pokemon`}
            />
          ) : (
            <div className={s.ImageFallbackBlock}>?</div>
          )}
        </div>
        <h3 className={s.Name}>{name}</h3>
        <p className={s.Types}>Types: {types.join(', ')}</p>
      </Link>
    </div>
  );
}
