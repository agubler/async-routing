import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { v, w } from '@dojo/widget-core/d';
import { DNode } from '@dojo/widget-core/interfaces';

export interface IssuesProperties {
	issues?: any[];
}

function mapIssues(issues: any[]): DNode[] {
	return issues.map((issue) => {
		return v('li', { key: String(issue.id) }, [
			v('span', [ String(issue.number) ]),
			v('span', [ ' - ' ]),
			v('a', {
				href: issue.html_url,
				innerHTML: issue.title,
				target: '_blank'
			})
		]);
	});
}

export class Issues extends WidgetBase<IssuesProperties> {
	protected render(): DNode | DNode[] {
		const { issues } = this.properties;

		return issues ? mapIssues(issues) : 'Loading...';
	}
}
