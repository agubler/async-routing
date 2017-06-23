import { Outlet } from '@dojo/routing/Outlet';
import { MapParamsOptions } from '@dojo/routing/interfaces';

import { IssuesContainer } from './../containers/IssuesContainer';

export const IssuesOutlet = Outlet(IssuesContainer, 'repo', ({ params, router }: MapParamsOptions) => {
	return {
		repo: params.repo
	};
});
