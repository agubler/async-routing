import { Evented } from '@dojo/core/Evented';
import request from '@dojo/core/request';

export class AppState extends Evented {

	private _appState: { [key: string]: any[] } = {}

	private _currentRepo: string;

	public fetchIssues(repo: string): void {
		this._currentRepo = repo;
		request.get(`https://api.github.com/repos/dojo/${repo}/issues`)
			.then((response) => response.json())
			.then((json: any[]) => { this._setIssues(repo, json); });

	}

	public getIssues(repo: string) {
		return this._appState[repo];
	}

	public get currentRepo(): string {
		return this._currentRepo;
	}

	private _setIssues(repo: string, issues: any[]) {
		this._appState[repo] = issues;
		this.emit({ type: 'invalidate' });
	}
}
