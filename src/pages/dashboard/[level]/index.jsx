import React, { useEffect, useMemo } from 'react';
import { BreadCrumbs } from 'components';
import { useRouter } from 'next/router';
import { PlacesStats, RenderLevel, EventsTable } from 'features/dashboard/Level';
import { useSelector } from 'react-redux';
import { getAuthUser, getPreviewAccount } from 'store/userSlice/selectors';
import { linkWithQuery } from 'helpers/links';
import { getRoundByLevel, ROUND_STYLES } from 'helpers/round';
import { useShadowLevelCardApi } from 'helpers/hooks/useShadowLevelCardApi';
import { useGetLineFillInterval } from 'helpers/hooks/useGetLineFillInterval';

const Level = () => {
  const { query } = useRouter();
  const authProfile = useSelector(getAuthUser);
  const previewAccount = useSelector(getPreviewAccount);
  const user = previewAccount.id || authProfile?.id;
  const program = getRoundByLevel(query.level);
  const { fill } = useGetLineFillInterval({ isAvailable: !previewAccount?.id });
  const { level, isLoadingOnTabOrFirst, callProgramLevel, onAddQueue } = useShadowLevelCardApi({
    user,
    program,
    level: query.level,
  });
  // const showClones = !previewAccount.id && !!level?.clones.length && !isLoadingOnTabOrFirst;
  const showClones = !!level?.clones.length && !isLoadingOnTabOrFirst;

  useEffect(() => {
    if (user) {
      callProgramLevel();
    }
  }, [user, program, query.level]);

  const breadCrumbsProps = {
    title: `level ${query.level}`,
    links: [
      {
        href: query.user ? linkWithQuery('/dashboard', { user: query?.user }) : '/dashboard',
        title: 'Dashboard',
      },
    ],
    program,
  };

  const actualPercent = useMemo(() => {
    if (isLoadingOnTabOrFirst || !!previewAccount?.id) return 0;

    return fill[query.level - 1];
  }, [query.level, fill, isLoadingOnTabOrFirst, previewAccount?.id]);

  const styleBg = {
    backgroundImage: `url('${ROUND_STYLES[program]?.levelPageBlur}')`,
    backgroundRepeat: 'round',
    backgroundSize: 'cover',
  };

  return (
    <div className="flex flex-col px-10 sm:px-0">
      <BreadCrumbs {...breadCrumbsProps} />
      <div className="flex flex-col z-two sm:px-5">
        <div className="mt-14 mb-18 h-full w-full">
          <RenderLevel
            data={level}
            isLoading={isLoadingOnTabOrFirst}
            onNewLine={onAddQueue}
            callProgramLevel={callProgramLevel}
            actualPercent={actualPercent}
          />
        </div>
        {showClones && (
          <div className="mb-12">
            <PlacesStats activeLineFill={actualPercent} clones={level?.clones} isLoading={isLoadingOnTabOrFirst} />
          </div>
        )}
      </div>
      <EventsTable userId={user} program={program} level={query?.level} />
      <div className="fixed top-0 right-0  inset-0" style={styleBg} />
    </div>
  );
};

export default Level;
