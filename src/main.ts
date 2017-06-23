import { ProjectorMixin } from '@dojo/widget-core/mixins/Projector';
import { registerRouterInjector } from '@dojo/routing/RouterInjector';
import { BaseInjector, Injector } from '@dojo/widget-core/Injector';
import { registry } from '@dojo/widget-core/d';

import { AppState } from './AppState';
import { App } from './App';

registry.define('state', Injector(BaseInjector, new AppState()));

const Projector = ProjectorMixin(App);
const projector = new Projector();

const config = [
	{
		path: '/',
		outlet: 'home',
		defaultRoute: true,
		children: [
			{
				path: 'repo/{repo}',
				outlet: 'repo',
				children: [
					{
						path: 'details/{id}',
						outlet: 'details'
					}
				]
			}
		]
	}
];

const router = registerRouterInjector(config);

projector.append();
router.start();
