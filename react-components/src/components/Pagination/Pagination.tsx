import jcn from '../../utils/joinClassNames';
import s from './Pagination.module.scss';

type PaginationProps = {
  className?: string;
  totalCount: number;
  currentPage: number;
  pageSize: number;
  siblingCount?: number;
  onPageChange?: (page: number) => void;
};

export default function Pagination(props: PaginationProps) {
  const {
    className,
    totalCount,
    pageSize,
    currentPage,
    onPageChange = () => null,
  } = props;

  const maxPage = Math.ceil(totalCount / pageSize);
  const pageNumbers = Array.from({ length: maxPage }).map((_, i) => i + 1);

  return (
    <ul className={jcn(s.PageList, className)}>
      {pageNumbers.map((n) => {
        const isActive = currentPage === n || undefined;
        return (
          <li key={n} className={jcn(s.PageItem, isActive && s.Active)}>
            <button
              type="button"
              className={s.PageItemButton}
              disabled={isActive}
              onClick={() => onPageChange(n)}
            >
              {n}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
