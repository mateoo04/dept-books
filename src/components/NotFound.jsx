import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <p className='text-center not-found-msg'>
      Oops, seems like you got lost.{' '}
      <Link className='link' to={'/'}>
        Click here to return.
      </Link>
    </p>
  );
}
