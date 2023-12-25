import React from 'react';

import {Link} from './exports';


export type NextLinkProps = React.ComponentProps<typeof Link>;

const NextLinkInternal = (
  {href, scroll, prefetch, children, ...props}: React.PropsWithChildren<NextLinkProps>,
  ref: React.ForwardedRef<HTMLAnchorElement>,
) => (
  <Link
    ref={ref}
    href={href}
    scroll={scroll || false}
    prefetch={prefetch || false}
    {...props}>
    {children}
  </Link>
);

export const NextLink = React.forwardRef(NextLinkInternal);
