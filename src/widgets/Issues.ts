import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { v, w } from '@dojo/widget-core/d';
import { DNode } from '@dojo/widget-core/interfaces';

export interface IssuesProperties {
	issues?: any[];
	firstPage: Function;
	previousPage: Function;
	nextPage: Function;
	lastPage: Function;
	hasFirstPage: Function;
	hasPreviousPage: Function;
	hasNextPage: Function;
	hasLastPage: Function;
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

	private _firstPage(): void {
		this.properties.firstPage();
	}

	private _previousPage(): void {
		this.properties.previousPage();
	}

	private _nextPage(): void {
		this.properties.nextPage();
	}

	private _lastPage(): void {
		this.properties.lastPage();
	}

	protected render(): DNode | DNode[] {
		const { issues } = this.properties;

		return issues ?
			v('div', [
				v('div', { styles: { margin: '15px' }},  [
					v('button', { onclick: this._firstPage, disabled: !this.properties.hasFirstPage() }, [ 'First Page' ]),
					v('button', { onclick: this._previousPage, disabled: !this.properties.hasPreviousPage() }, [ 'Previous Page' ]),
					v('button', { onclick: this._nextPage, disabled: !this.properties.hasNextPage() }, [ 'Next Page' ]),
					v('button', { onclick: this._lastPage, disabled: !this.properties.hasLastPage() }, [ 'Last Page' ])
				]),
				v('ul', mapIssues(issues))
			]) : 'Loading...';
	}
}
