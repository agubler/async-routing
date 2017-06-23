import { Evented } from '@dojo/core/Evented';
import request from '@dojo/core/request';

interface PageLinks {
	first: string;
	prev: string;
	next: string;
	last: string;
}

function parseLinkHeader(rawLinks: string | null): PageLinks | undefined {
	if (rawLinks === null) {
		return undefined;
	}
	const parts = rawLinks.split(',');
	const links: any = {};
	for (let i = 0; i < parts.length; i++) {
		const section = parts[i].split(';');
		const url = section[0].replace(/<(.*)>/, '$1').trim();
		const name = section[1].replace(/rel="(.*)"/, '$1').trim();
		links[name] = url;
	}
	return links;
}

export class AppState extends Evented {

	private _appState: { [key: string]: any[] } = {};

	private _currentRepo: string;

	private _links: PageLinks | undefined;

	public fetchIssues(repo: string): void {
		this._currentRepo = repo;
		this._links = undefined;
		this._makeRequest(`https://api.github.com/repos/dojo/${repo}/issues`);
	}

	public firstPage() {
		if (this._links && this._links.first) {
			this._makeRequest(this._links.first);
		}
	}

	public previousPage() {
		if (this._links && this._links.prev) {
			this._makeRequest(this._links.prev);
		}
	}

	public nextPage() {
		if (this._links && this._links.next) {
			this._makeRequest(this._links.next);
		}
	}

	public lastPage() {
		if (this._links && this._links.last) {
			this._makeRequest(this._links.last);
		}
	}

	public hasFirstPage(): boolean {
		return Boolean(this._links && this._links.first);
	}

	public hasPreviousPage(): boolean {
		return Boolean(this._links && this._links.prev);
	}

	public hasNextPage(): boolean {
		return Boolean(this._links && this._links.next);
	}

	public hasLastPage(): boolean {
		return Boolean(this._links && this._links.last);
	}

	public getIssues(repo: string) {
		return this._appState[repo];
	}

	public get currentRepo(): string {
		return this._currentRepo;
	}

	public get links(): PageLinks | undefined {
		return this._links;
	}

	private _makeRequest(url: string): void {
		request.get(url)
			.then((response) => {
				if (response.headers) {
					this._links = parseLinkHeader(response.headers.get('link'));
				}
				return response.json();
			})
			.then((json: any[]) => { this._setIssues(this._currentRepo, json); });

	}

	private _setIssues(repo: string, issues: any[]) {
		this._appState[repo] = issues;
		this.emit({ type: 'invalidate' });
	}
}
