import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { v, w } from '@dojo/widget-core/d';
import { DNode } from '@dojo/widget-core/interfaces';
import { Link } from '@dojo/routing/Link';

import { IssuesOutlet } from './outlets/IssuesOutlet';

function getLinks(repos: string[]): DNode[] {
	return repos.map((repo) => {
		return w(Link, {
			key: repo,
			to: 'repo',
			params: {
				repo
			},
			isOutlet: true,
			styles: { 'margin-right': '20px' }
		}, [ repo ]);
	});

}

export class App extends WidgetBase {

	protected render(): DNode {
		return v('div', [
			v('div', getLinks(['examples', 'widget-core', 'widgets'])),
			v('ul', [
				w(IssuesOutlet, {})
			])
		]);
	}
}
