import { Container } from '@dojo/widget-core/Container';

import { Issues } from './../widgets/Issues';
import { AppState } from './../AppState';

function getProperties(appState: AppState, properties: any) {
	if (appState.currentRepo !== properties.repo) {
		appState.fetchIssues(properties.repo);
	}

	return {
		issues: appState.getIssues(properties.repo)
	};
}

export const IssuesContainer = Container(Issues, 'state', { getProperties });
