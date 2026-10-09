import { type FC } from 'react';

import { Particles } from '@/components/Particles';
import Mask from '@/components/mask';
import NotFoundMask from '@/components/notFound/NotFoundMask';
import NotFoundBody from '@/components/notFound/NotFoundBody';

const NotFound: FC = () => {
  return (
    <main className="relative bg-dark-blue text-white">
      <Particles className="fixed inset-0 h-screen" />

      <div className="absolute bottom-0 left-0 right-0 top-0 w-full">
        <Mask>
          <NotFoundMask />
        </Mask>
      </div>

      <div className="relative">
        <NotFoundBody />
      </div>
    </main>
  );
};

export default NotFound;
