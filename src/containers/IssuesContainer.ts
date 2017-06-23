import { Container } from '@dojo/widget-core/Container';

import { Issues } from './../widgets/Issues';
import { AppState } from './../AppState';

function getProperties(appState: AppState, properties: any) {
	if (appState.currentRepo !== properties.repo) {
		appState.fetchIssues(properties.repo);
	}

	return {
		issues: appState.getIssues(properties.repo),
		firstPage: appState.firstPage.bind(appState),
		previousPage: appState.previousPage.bind(appState),
		nextPage: appState.nextPage.bind(appState),
		lastPage: appState.lastPage.bind(appState),
		hasFirstPage: appState.hasFirstPage.bind(appState),
		hasPreviousPage: appState.hasPreviousPage.bind(appState),
		hasNextPage: appState.hasNextPage.bind(appState),
		hasLastPage: appState.hasLastPage.bind(appState)
	};
}

export const IssuesContainer = Container(Issues, 'state', { getProperties });
